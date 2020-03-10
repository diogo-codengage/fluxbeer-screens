import React from 'react'

import {animated, useTransition} from 'react-spring'
import picpayLogo from "../assets/images/picpay.svg";


export const Payment = ({visible, paymentData}) => {
  const {qrcode: {base64}, value} = paymentData;
  const price = value.toFixed(2);
  const transitions = useTransition(visible, null, {
    from: {
      opacity: 0,
      transform: 'scale(1.2) translateX(-50px)'
    },

    enter: {
      opacity: 1,
      transform: 'scale(1) translateX(0)'
    },

    leave: {
      opacity: 0,
      transform: 'scale(0.8) translateX(100px)'
    }
  })

  return transitions.map(
    ({item, key, props}) =>
      item && (
        <animated.div
          key={key}
          style={props}
          className="flex bg-white p-6 rounded-tl-2xl rounded-bl-2xl shadow-payment"
        >
          <div className="flex-1">
            <img src={base64} alt="QRCode"/>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="font-light text-lg">Copo (300ml)</div>

            <div className="flex mb-4">
              <div className="font-regular text-2xl">R$</div>
              <div className="font-bold text-5xl leading-none">{price}</div>
            </div>

            <div className="font-light text-lg">Pague com</div>

            <img className="h-10" src={picpayLogo} alt="PicPay"/>
          </div>
        </animated.div>
      )
  )
}
