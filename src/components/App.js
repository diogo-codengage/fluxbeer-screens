import "../assets/css/App.css";
import React, { useState, useMemo, useEffect } from "react";

import { useQuery, useSubscription, useMutation } from "@apollo/react-hooks";
// import { ipcRenderer } from "electron";
import { useMachine } from "@xstate/react";

import pdvMachine from "../machine";
import { picpayPaymentRequest } from "../services/PicPayService";
import {
  TAP_INFO_QUERY,
  CONSUMPTION_BEGIN_MUTATION,
  CONSUMPTION_END_MUTATION,
  AVAILABLE_CONSUMPTION_SUBSCRIPTION
} from "../services/GraphQlApiService";

import { UnauthenticatedScreen } from "./UnauthenticatedScreen";
import { AwaitingSinglePurchase } from "./AwaitingSinglePurchase";
import { ReadingCard } from "./ReadingCard";
import { PaymentConfirmed } from "./PaymentConfirmed";
import { TapToServe } from "./TapToServe";
import { Finished } from "./Finished";
import { Error } from "./Error";

import { TemplateBackground } from "./TemplateBackground";

const TAP_ID = 1;

const ipcRenderer = {
  send: () => {},
  on: () => {}
};

function App() {
  const [current, send] = useMachine(pdvMachine);
  const [volume, setVolume] = useState(0);
  const [product, setProduct] = useState();
  const [consumption, setConsumption] = useState();
  const [picpay, setPicpay] = useState();

  // mock
  const [screen, setScreen] = useState(0);

  const { loading, error, data } = useQuery(TAP_INFO_QUERY, {
    variables: { tapId: TAP_ID }
  });
  const [beginConsumption, { beginData }] = useMutation(
    CONSUMPTION_BEGIN_MUTATION
  );
  const [endConsumption, { endData }] = useMutation(CONSUMPTION_END_MUTATION);

  useMemo(() => {
    if (data) {
      const {
        tap_by_pk: {
          tap_containers: [
            {
              stock_container: { product }
            }
          ]
        }
      } = data;
      setProduct(product);
    }
  }, [data]);

  useEffect(() => {
    if (product) {
      ipcRenderer.send("INIT");
      send("DISPONIVEL");
    }
  }, [product]);

  useSubscription(AVAILABLE_CONSUMPTION_SUBSCRIPTION, {
    variables: { tapId: TAP_ID },
    onSubscriptionData: ({ subscriptionData }) => {
      console.log("===> Socket recebido: ", subscriptionData);
      const {
        data: {
          consumption_order: [consumption]
        }
      } = subscriptionData;
      if (consumption) {
        setConsumption(consumption);
        send("AUTENTICADO");
      }
      return subscriptionData;
    }
  });

  useEffect(() => {
    ipcRenderer.on("FLOW", (e, payload) => {
      const volume = payload.volume;
      setVolume(volume);
    });
    ipcRenderer.on(
      "FINISHED",
      (e, { consumptionBeginId, totalAmount, code, metrics }) => {
        console.warn("FINISHED: ", { consumptionBeginId, totalAmount });
        endConsumption({
          variables: {
            consumptionBeginId,
            totalAmount,
            code,
            metric: metrics
          }
        })
          .then(result => {
            console.warn("ConsumptionEnd", result);
          })
          .finally(() => send("FINALIZADO"));
      }
    );
  }, []);

  useEffect(() => {
    console.log("STATE:", current.value);
    if (current.matches("disponivel.nao_autenticado")) {
      console.warn("###> PICPAY REQUEST");
      if (product)
        picpayPaymentRequest({
          tapId: TAP_ID,
          productId: product.id,
          price: product.price
        }).then(result => setPicpay(result));

      if (consumption) {
        console.warn("===> Consumo identificado?", consumption);
        send("AUTENTICADO");
      }
    } else if (current.matches("disponivel.autenticado.servindo")) {
      beginConsumption({
        variables: {
          limitAmount: consumption.amount,
          consumptionOrderId: consumption.id
        }
      }).then(
        ({
          data: {
            insert_consumption_begin: {
              returning: [consumptionBegin]
            }
          }
        }) => {
          ipcRenderer.send("AUTHENTICATED", {
            ...consumptionBegin,
            code: consumption.code
          });
        }
      );
    } else if (current.matches("disponivel.autenticado.finalizado")) {
      console.log("[FINALIZED] ===> ", consumption);
      ipcRenderer.send("FINALIZED", {});
      setConsumption(undefined);
      setVolume(0);
    }
  }, [current]);

  return (
    <TemplateBackground
      onNext={() => setScreen(old => old + 1)}
      onPrev={() => setScreen(old => old - 1)}
    >
      {screen === 0 && (
        <UnauthenticatedScreen visible picpay={picpay} product={product} />
      )}
      {screen === 1 && <AwaitingSinglePurchase duration={30000} />}
      {screen === 2 && <PaymentConfirmed />}
      {screen === 3 && (
        <TapToServe
          currentMl={350}
          balance={34.35}
          value={4.5}
          duration={10000}
        />
      )}
      {screen === 4 && <Finished />}
      {screen === 5 && <Error />}
      {screen === 6 && <ReadingCard />}

      {/* {current.matches('disponivel.autenticado.confirmado') && <Success/>} */}
      {/* {current.matches('disponivel.autenticado.servindo') && <BeerPour volume={volume}/>} */}
      {/* {current.matches('disponivel.autenticado.sem_fluxo') && <div>sem_fluxo</div>} */}
      {/* {current.matches('disponivel.autenticado.finalizado') && <div>finalizado</div>} */}
      {/* {current.matches('disponivel.autenticado.sessao_finalizada') && <div>sessao_finalizada</div>} */}
    </TemplateBackground>
  );
}

export default App;
