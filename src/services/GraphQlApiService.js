import {gql} from '@apollo/client';

export const PRODUCT_QUERY = gql`
  {
    product_by_pk(id: 1) {
      abv
      active
      alcohol
      bitterness
      body
      ean
      ibu
      id
      ingredients
      measured_unit_id
      name
      note
      obs
      price
      product_category_id
      product_photo
      product_type_id
    }
  }


`;

export const AVAILABLE_CONSUMPTION_SUBSCRIPTION = gql`
  subscription availableConsumption {
    tap_consumption(
      limit: 1,
      order_by: {id: desc},
      where: {status_id: {_eq: 4}, tap_id: {_eq: 1}}) {
      id
      status_id
      tap_id
      total_amount
      created_at
      available_amount
    }
  }
`;

// export const CONSUMPTION_BEGIN_MUTATION = gql``;

export const CONSUMPTION_END_MUTATION = gql`
  mutation updateConsumptionMutation($id: Int!, $total_amount: Float!) {
    update_tap_consumption(
      _set: {status_id: 2, total_amount: $total_amount},
      where: {id: {_eq: $id}}) {
      affected_rows
      returning {
        status_id
        id
        available_amount
        total_amount
      }
    }
  }
`;

export const PERFORMANCE_METRIC_MUTATION = gql`
  mutation storePerformanceMetric($metric: jsonb!, $tapId: Int!, $group: String, $referenceId: String) {
    insert_performance_metric(objects: {
      group: $group,
      tapId: $tapId,
      referenceId: $referenceId,
      metric: $metric
    }) {
      returning {
        createdAt
        id
        metric
      }
    }
  }
`;

