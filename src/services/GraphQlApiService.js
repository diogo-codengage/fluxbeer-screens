import {gql} from '@apollo/client';

export const TAP_INFO_QUERY = gql`
  query tapInfo($tapId: bigint!) {
    tap_by_pk(id: $tapId) {
      alias
      companyId
      id
      serial
      tap_containers(limit: 1, order_by: {createdAt: desc}) {
        stock_container {
          measureUnit
          capacity
          createdAt
          product {
            code
            companyId
            id
            info
            name
            photo
          }
        }
      }
    }
  }
`;

export const AVAILABLE_CONSUMPTION_SUBSCRIPTION = gql`
  subscription availableConsumption($tapId: bigint) {
    consumption_order(where: {_not: {consumption_begins: {}}, tapId: {_eq: $tapId}}, order_by: {id: asc}, limit: 1) {
      amount
      code
      comment
      createdAt
      id
      saleId
      tapId
      consumption_begins {
        id
        createdAt
      }
    }
  }
`;

// export const CONSUMPTION_BEGIN_MUTATION = gql``;

export const CONSUMPTION_BEGIN_MUTATION = gql`
  mutation consumptionBeginMutation($limitAmount: Int!, $consumptionOrderId: bigint) {
    insert_consumption_begin(objects: {limitAmount: $limitAmount, consumptionOrderId: $consumptionOrderId}) {
      returning {
        id
        createdAt
        consumptionOrderId
        client_id
        limitAmount
      }
    }
  }
`;

export const CONSUMPTION_END_MUTATION = gql`
  mutation consumptionEndMutation($consumptionBeginId: bigint!, $totalAmount: Int!, $code: uuid, $metric: jsonb) {
    insert_consumption_end(objects: {consumptionBeginId: $consumptionBeginId, totalAmount: $totalAmount, code: $code, metric: $metric}) {
      returning {
        code
        id
        createdAt
        consumptionBeginId
        reference
        totalAmount
        consumption_begin {
          client_id
          consumptionOrderId
          id
          limitAmount
          createdAt
        }
      }
    }
  }
`;
