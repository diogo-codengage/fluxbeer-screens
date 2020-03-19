import {Machine, assign} from 'xstate'

// Available variables:
// - Machine
// - interpret
// - assign
// - send
// - sendParent
// - spawn
// - raise
// - actions
// - XState (all XState exports)

export default Machine({
  id: 'tap',
  initial: 'disconnected',
  context: {
    tapInfo: undefined,
    identifiedConsumptionTimeout: 10000,
    unidentifiedConsumptionTimeout: 30000,
    error: undefined,
  },
  states: {
    disconnected: {
      on: {
        CONNECTION: {
          target: 'connected'
        }
      }
    },
    connected: {
      id: 'connected',
      initial: 'idle',
      context: {
        consumption: undefined,
      },
      states: {
        idle: {
          invoke: {
            src: 'idleInvocation',
          },
          on: {
            ORDER: 'releasing',
            IDENTIFIED: 'validating',
            MAINTENANCE: 'maintenance'
          }
        },
        releasing: {
          invoke: {
            src: 'releasing',
            onDone: 'consumption',
            onError: 'unavailable',
          },
          after: {
            10000: 'unavailable'
          },
        },
        validating: {
          invoke: {
            src: 'validating',
          },
          after: {
            10000: 'unavailable'
          },
          on: {
            VALIDATED: 'consumption',
            INVALID: 'unavailable'
          }
        },

        consumption: {
          id: 'consumption',
          initial: 'available',
          invoke: {
            src: 'consumption'
          },
          onDone: 'idle',
          states: {
            available: {
              on: {
                TIMEOUT: 'expired',
                FINISHED: 'finish'
              }
            },
            finish: {
              invoke: {src: 'finish'},
              after: {
                2000: 'done'
              }
            },
            expired: {
              after: {
                5000: 'done'
              }
            },
            done: {
              type: 'final'
            }

          }
        },


        unavailable: {
          after: {
            3000: 'idle'
          }
        },


        maintenance: {
          id: 'maintenance',
          initial: 'idle',
          context: {
            volume: 0
          },
          onDone: 'idle',
          states: {
            idle: {
              on: {
                CALIBRATE: 'calibrating',
                DEPLETE: 'depletion',
                END: 'done',
              }
            },
            calibrating: {
              on: {
                FINISHED: 'idle'
              }
            },
            depletion: {
              on: {
                FINISHED: 'idle'
              }
            },
            done: {
              type: 'final'
            }

          }
        },

      }
    },


    failure: {
      invoke: {
        src: 'teste',
      },
      type: 'final'
    }
  }
});
