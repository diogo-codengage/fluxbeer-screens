import React, {useState, useMemo, useEffect} from 'react'
import {useQuery, useSubscription, useMutation} from '@apollo/react-hooks'
// import {ipcRenderer} from "electron";
import {useMachine} from '@xstate/react'

import tapMachine from '../machine'
import {picpayPaymentRequest} from '../services/PicPayService'

import '../assets/css/App.css'

import { UnauthenticatedScreen } from "./UnauthenticatedScreen";
import { AwaitingSinglePurchase } from "./AwaitingSinglePurchase";
import { ReadingCard } from "./ReadingCard";
import { PaymentConfirmed } from "./PaymentConfirmed";
import { PaymentRefused } from "./PaymentRefused";
import { TapToServe } from "./TapToServe";
import { Finished } from "./Finished";
import { Maintenance } from "./Maintenance";
import { Title } from "./Title";

import { TemplateBackground } from "./TemplateBackground";

import {
  TAP_INFO_QUERY,
  CONSUMPTION_BEGIN_MUTATION,
  CONSUMPTION_END_MUTATION,
  AVAILABLE_CONSUMPTION_SUBSCRIPTION,
} from "../services/GraphQlApiService"

// @TODO Obter parametrização na inicialização da tap
const TAP_SERIAL = 1 // @TODO: Bring serial code from environment
const AMOUNT = 100
const ML_PER_PULSE = 0.11

const ipcRenderer = {
  send: () => {},
  on: () => {}
}

function App() {
  // mock
  const [screen, setScreen] = useState(0);
  const storeConsumptionBegin = ({data: {type, order, tag}}) => {
    if (order)
      return beginConsumption({
        variables: {
          limitAmount: order.amount,
          consumptionOrderId: order.id
        }
      })
    else if (tag)
      console.error(tag)

    throw new Error('NOT IMPLEMENTED')
  }

  const newConsumption = async (args) => {
    const response = await storeConsumptionBegin(args)
    const {data: {insert_consumption_begin: {returning: [consumptionBegin]}}} = response
    return consumptionBegin
  }

  const [current, send] = useMachine(tapMachine, {
    services: {

      connect: async () => {
        return {tapSerial: TAP_SERIAL, tapId: TAP_SERIAL, mlPerPulse: ML_PER_PULSE}
      },

      idleInvocation: async () => {
        /* // Verifica se há ordem de consumo na fila do socket
         if (consumptionOrder) {
           setConsumptionOrder(null)
           send('ORDER', consumptionOrder)
           return consumptionOrder
         } */
        // Começa a ouvir evento de autenticação por RFID
        ipcRenderer.on('RFID', (e, payload) => {
          console.warn('> > > RFID: ', payload)
          send('IDENTIFIED', payload)
        })

        console.warn('###> PICPAY REQUEST')
        if (product) picpayPaymentRequest({tapId: TAP_SERIAL, productId: product.id, price: product.price})
          .then((result) => setPicpay(result))
      },

      releasing: async (context, payload) => {
        console.log('---> Liberando: ', payload)
        // @TODO Recebido liberação de consumo via ordem
        return {type: 'order', order: payload}
      },

      validating: async (context, payload) => {
        // @TODO Validação de TAG RFID para liberação do consumo
        console.error('TAG > > >', payload)
        return {type: 'rfid', tag: payload}
      },

      consumption: async (context, payload) => {
        const begin = await newConsumption(payload)
        console.log(payload)

        ipcRenderer.send('AUTHENTICATED', {...begin, code: begin.code})
        ipcRenderer.on('FLOW', (e, pulse) => {
          const volume = pulse.volume
          console.log(pulse)
          setVolume(volume)
        })

        ipcRenderer.on('FINISHED', (e, payload) => {
          console.log('FINISHED', payload)
          send('FINISHED', payload)
        })

        return begin
      },

      finish: async (context, {consumptionBeginId, totalAmount, code, metrics}) => {
        console.warn('FINISHED: ', {consumptionBeginId, totalAmount, code, metrics})
        ipcRenderer.send('FINALIZED', {})
        setVolume(0)
        const result = await endConsumption({
          variables: {
            consumptionBeginId,
            totalAmount,
            code,
            metric: metrics
          }
        })
        console.warn('ConsumptionEnd', result)
      }

    }
  })

  const [volume, setVolume] = useState(0)
  const [product, setProduct] = useState()
  // const [consumptionOrder, setConsumptionOrder] = useState() // @TODO Se necessário fila de consumo
  const [picpay, setPicpay] = useState()

  const {loading, error, data} = useQuery(TAP_INFO_QUERY, {variables: {tapId: TAP_SERIAL}});
  const [beginConsumption, {beginData}] = useMutation(CONSUMPTION_BEGIN_MUTATION)
  const [endConsumption, {endData}] = useMutation(CONSUMPTION_END_MUTATION)

  useMemo(() => {
    if (data) {
      const {tap_by_pk: {tap_containers: [{stock_container: {product}}]}} = data
      send('CONNECTION', product)
      setProduct(product);
    }
  }, [data])

  useSubscription(AVAILABLE_CONSUMPTION_SUBSCRIPTION, {
    variables: {tapId: TAP_SERIAL},
    onSubscriptionData: ({subscriptionData}) => {
      const {data: {consumption_order: [order]}} = subscriptionData
      if (order) {
        send('ORDER', order)
      }
      return order
    }
  })

  return (
    <TemplateBackground
      onNext={() => setScreen(old => old + 1)}
      onPrev={() => setScreen(old => old - 1)}
    >

        <TapToServe
          currentConsumption={0}
          totalConsumption={350}
          totalValue={34.35}
          currentValue={0}
          name="Diogo"
          duration={10000}
        />
      {/* {screen === 0 && (
        <UnauthenticatedScreen visible picpay={picpay} product={product} />
      )}
      {screen === 1 && <AwaitingSinglePurchase visible duration={30000} />}
      {screen === 2 && <PaymentConfirmed />}
      {screen === 3 && <PaymentRefused />}
      {screen === 4 && (
        <TapToServe
          // name="Diogo"
          currentMl={350}
          balance={34.35}
          value={4.5}
          duration={10000}
        />
      )}
      {screen === 5 && <Finished />}
      {screen === 6 && <Maintenance />}
      {screen === 7 && <ReadingCard duration={30000} />} */}

      {current.matches('disconnected') && (
          <div className="flex flex-1 items-center justify-center">
            <Title visible={current.matches('disconnected')}>FLUX.BEER</Title>
          </div>
      )}
    </TemplateBackground>
    // <div className="app-container w-screen h-screen flex flex-col items-center overflow-hidden"
    //      style={{backgroundImage: `url(${bg})`}}>
    //   <div className="flex-1 flex flex-col items-center w-full">
    //     {current.matches('disconnected') && (
    //       <div className="flex flex-1 items-center justify-center">
    //         <Title visible={current.matches('disconnected')}>FLUX.BEER</Title>
    //       </div>
    //     )}

    //     {current.matches('connected') && (
    //       <div className="pt-12">
    //         <Logo/>
    //       </div>
    //     )}

    //     {(current.matches('connected.idle')) && (
    //       <UnauthenticatedScreen visible={current.matches('connected.idle')} picpay={picpay}
    //                              product={product}/>
    //     )}
    //     {current.matches('connected.autenticado.confirmado') && <Success/>}
    //     {current.matches('connected.autenticado.servindo') && <BeerPour volume={volume}/>}
    //     {current.matches('connected.autenticado.sem_fluxo') && <div>sem_fluxo</div>}
    //     {current.matches('connected.autenticado.finalizado') && <div>finalizado</div>}
    //     {current.matches('connected.autenticado.sessao_finalizada') && <div>sessao_finalizada</div>}
    //   </div>

    // </div>
  )
}

export default App
