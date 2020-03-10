import { Machine } from 'xstate'

export default Machine({
  initial: 'indisponivel',
  context: {
    fluxo: 0
  },
  states: {
    indisponivel: {
      on: {
        DISPONIVEL: {
          target: 'disponibilizando'
        }
      }
    },
    disponibilizando: {
      after: {
        300: 'disponivel'
      }
    },
    disponivel: {
      id: 'disponivel',
      initial: 'nao_autenticado',
      on: {
        INDISPONIVEL: {
          target: 'indisponivel'
        }
      },
      states: {
        nao_autenticado: {
          on: {
            AUTENTICADO: {
              target: 'autenticando'
            }
          }
        },
        autenticando: {
          after: {
            500: 'autenticado'
          }
        },
        autenticado: {
          on: {
            LOGOUT: {
              target: 'nao_autenticado'
            }
          },
          initial: 'confirmado',
          states: {
            confirmado: {
              after: {
                3300: 'servindo'
              }
            },
            servindo: {
              on: {
                FLUXO: [
                  {
                    target: 'servindo'
                  },
                ],
                FINALIZADO: [
                  {
                    target: 'finalizado'
                  },
                ],
                SEM_FLUXO: {
                  target: 'finalizado'
                }
              }
            },
            finalizado: {
              after:{
                3000: 'sessao_finalizada'
              }
            },
            sessao_finalizada: {
              on: {
                '': {
                  target: '#disponivel.nao_autenticado'
                }
              }
            }
          }
        }
      }
    }
  }
})
