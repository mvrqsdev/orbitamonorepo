import { Prisma } from '@prisma/client'

export const UserBase = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  image: true,
  name: true,
  email: true,
  master: true,
  chatwootAgentId: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  _count: true,
})

export const UserSelect = Prisma.validator<Prisma.UserSelect>()({
  ...UserBase,
  Permissions: {
    select: {
      Permission: {
        select: {
          id: true,
          description: true,
          slug: true,
          _count: true,
        },
      },
    },
  },
  Leads: {
    select: {
      id: true,
      title: true,
      value: true,
      status: true,
      laneId: true,
      customerId: true,
      lostedLeadReasonId: true,
      userId: true,
      createdAt: true,
      updatedAt: true,
      _count: true,
      Customer: {
        select: {
          id: true,
          picture: true,
          name: true,
          email: true,
          phone: true,
          chatwootContactId: true,
          createdAt: true,
          updatedAt: true,
          _count: true,
        },
      },
      Campaigns: {
        select: {
          Campaign: {
            select: {
              id: true,
              projectId: true,
              sourceId: true,
              title: true,
              createdAt: true,
              updatedAt: true,
              _count: true,
              Source: {
                select: {
                  id: true,
                  title: true,
                  createdAt: true,
                  updatedAt: true,
                  _count: true,
                },
              },
              Project: {
                select: {
                  id: true,
                  constructionId: true,
                  title: true,
                  url: true,
                  createdAt: true,
                  updatedAt: true,
                  _count: true,
                  ConstructionCompany: {
                    select: {
                      id: true,
                      name: true,
                      email: true,
                      createdAt: true,
                      updatedAt: true,
                      _count: true,
                      Contacts: {
                        select: {
                          id: true,
                          constructionCompanyId: true,
                          name: true,
                          email: true,
                          phone: true,
                          createdAt: true,
                          updatedAt: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      LostedReason: {
        select: {
          id: true,
          reason: true,
          createdAt: true,
          updatedAt: true,
          _count: true,
        },
      },
      Tags: {
        select: {
          Tag: {
            select: {
              id: true,
              name: true,
              description: true,
              color: true,
              createdAt: true,
              updatedAt: true,
              _count: true,
            },
          },
        },
      },
    },
  },
  LeadComments: {
    select: {
      id: true,
      leadId: true,
      content: true,
      userId: true,
      deleted: true,
      createdAt: true,
      updatedAt: true,
      Lead: {
        select: {
          id: true,
          title: true,
          value: true,
          status: true,
          laneId: true,
          customerId: true,
          lostedLeadReasonId: true,
          userId: true,
          createdAt: true,
          updatedAt: true,
          _count: true,
          Broker: {
            select: UserBase,
          },
          Customer: {
            select: {
              id: true,
              picture: true,
              name: true,
              email: true,
              phone: true,
              chatwootContactId: true,
              createdAt: true,
              updatedAt: true,
              _count: true,
            },
          },
          Campaigns: {
            select: {
              Campaign: {
                select: {
                  id: true,
                  projectId: true,
                  sourceId: true,
                  title: true,
                  createdAt: true,
                  updatedAt: true,
                  _count: true,
                  Source: {
                    select: {
                      id: true,
                      title: true,
                      createdAt: true,
                      updatedAt: true,
                      _count: true,
                    },
                  },
                  Project: {
                    select: {
                      id: true,
                      constructionId: true,
                      title: true,
                      url: true,
                      createdAt: true,
                      updatedAt: true,
                      _count: true,
                      ConstructionCompany: {
                        select: {
                          id: true,
                          name: true,
                          email: true,
                          createdAt: true,
                          updatedAt: true,
                          _count: true,
                          Contacts: {
                            select: {
                              id: true,
                              constructionCompanyId: true,
                              name: true,
                              email: true,
                              phone: true,
                              createdAt: true,
                              updatedAt: true,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          LostedReason: {
            select: {
              id: true,
              reason: true,
              createdAt: true,
              updatedAt: true,
              _count: true,
            },
          },
          Tags: {
            select: {
              Tag: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                  color: true,
                  createdAt: true,
                  updatedAt: true,
                  _count: true,
                },
              },
            },
          },
        },
      },
    },
  },
  LeadDocuments: {
    select: {
      leadId: true,
      userId: true,
      name: true,
      path: true,
      createdAt: true,
      updatedAt: true,
      Lead: {
        select: {
          id: true,
          title: true,
          value: true,
          status: true,
          laneId: true,
          customerId: true,
          lostedLeadReasonId: true,
          userId: true,
          createdAt: true,
          updatedAt: true,
          _count: true,
          Broker: {
            select: UserBase,
          },
          Customer: {
            select: {
              id: true,
              picture: true,
              name: true,
              email: true,
              phone: true,
              chatwootContactId: true,
              createdAt: true,
              updatedAt: true,
              _count: true,
            },
          },
          Campaigns: {
            select: {
              Campaign: {
                select: {
                  id: true,
                  projectId: true,
                  sourceId: true,
                  title: true,
                  createdAt: true,
                  updatedAt: true,
                  _count: true,
                  Source: {
                    select: {
                      id: true,
                      title: true,
                      createdAt: true,
                      updatedAt: true,
                      _count: true,
                    },
                  },
                  Project: {
                    select: {
                      id: true,
                      constructionId: true,
                      title: true,
                      url: true,
                      createdAt: true,
                      updatedAt: true,
                      _count: true,
                      ConstructionCompany: {
                        select: {
                          id: true,
                          name: true,
                          email: true,
                          createdAt: true,
                          updatedAt: true,
                          _count: true,
                          Contacts: {
                            select: {
                              id: true,
                              constructionCompanyId: true,
                              name: true,
                              email: true,
                              phone: true,
                              createdAt: true,
                              updatedAt: true,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          LostedReason: {
            select: {
              id: true,
              reason: true,
              createdAt: true,
              updatedAt: true,
              _count: true,
            },
          },
          Tags: {
            select: {
              Tag: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                  color: true,
                  createdAt: true,
                  updatedAt: true,
                  _count: true,
                },
              },
            },
          },
        },
      },
    },
  },
  Schedules: {
    select: {
      id: true,
      userId: true,
      leadId: true,
      date: true,
      status: true,
      address: true,
      nextNotificationAt: true,
      createdAt: true,
      updatedAt: true,
      _count: true,
      Lead: {
        select: {
          id: true,
          title: true,
          value: true,
          status: true,
          laneId: true,
          customerId: true,
          lostedLeadReasonId: true,
          userId: true,
          createdAt: true,
          updatedAt: true,
          _count: true,
          Broker: {
            select: UserBase,
          },
          Customer: {
            select: {
              id: true,
              picture: true,
              name: true,
              email: true,
              phone: true,
              chatwootContactId: true,
              createdAt: true,
              updatedAt: true,
              _count: true,
            },
          },
          Campaigns: {
            select: {
              Campaign: {
                select: {
                  id: true,
                  projectId: true,
                  sourceId: true,
                  title: true,
                  createdAt: true,
                  updatedAt: true,
                  _count: true,
                  Source: {
                    select: {
                      id: true,
                      title: true,
                      createdAt: true,
                      updatedAt: true,
                      _count: true,
                    },
                  },
                  Project: {
                    select: {
                      id: true,
                      constructionId: true,
                      title: true,
                      url: true,
                      createdAt: true,
                      updatedAt: true,
                      _count: true,
                      ConstructionCompany: {
                        select: {
                          id: true,
                          name: true,
                          email: true,
                          createdAt: true,
                          updatedAt: true,
                          _count: true,
                          Contacts: {
                            select: {
                              id: true,
                              constructionCompanyId: true,
                              name: true,
                              email: true,
                              phone: true,
                              createdAt: true,
                              updatedAt: true,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          LostedReason: {
            select: {
              id: true,
              reason: true,
              createdAt: true,
              updatedAt: true,
              _count: true,
            },
          },
          Tags: {
            select: {
              Tag: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                  color: true,
                  createdAt: true,
                  updatedAt: true,
                  _count: true,
                },
              },
            },
          },
        },
      },
      Participants: {
        select: {
          Participant: {
            select: UserBase,
          },
        },
      },
    },
  },
  ScheduleParticipating: {
    select: {
      Schedule: {
        select: {
          id: true,
          userId: true,
          leadId: true,
          date: true,
          status: true,
          address: true,
          nextNotificationAt: true,
          createdAt: true,
          updatedAt: true,
          _count: true,

          Lead: {
            select: {
              id: true,
              title: true,
              value: true,
              status: true,
              laneId: true,
              customerId: true,
              lostedLeadReasonId: true,
              userId: true,
              createdAt: true,
              updatedAt: true,
              _count: true,
              Broker: {
                select: UserBase,
              },
              Customer: {
                select: {
                  id: true,
                  picture: true,
                  name: true,
                  email: true,
                  phone: true,
                  chatwootContactId: true,
                  createdAt: true,
                  updatedAt: true,
                  _count: true,
                },
              },
              Campaigns: {
                select: {
                  Campaign: {
                    select: {
                      id: true,
                      projectId: true,
                      sourceId: true,
                      title: true,
                      createdAt: true,
                      updatedAt: true,
                      _count: true,
                      Source: {
                        select: {
                          id: true,
                          title: true,
                          createdAt: true,
                          updatedAt: true,
                          _count: true,
                        },
                      },
                      Project: {
                        select: {
                          id: true,
                          constructionId: true,
                          title: true,
                          url: true,
                          createdAt: true,
                          updatedAt: true,
                          _count: true,
                          ConstructionCompany: {
                            select: {
                              id: true,
                              name: true,
                              email: true,
                              createdAt: true,
                              updatedAt: true,
                              _count: true,
                              Contacts: {
                                select: {
                                  id: true,
                                  constructionCompanyId: true,
                                  name: true,
                                  email: true,
                                  phone: true,
                                  createdAt: true,
                                  updatedAt: true,
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
              LostedReason: {
                select: {
                  id: true,
                  reason: true,
                  createdAt: true,
                  updatedAt: true,
                  _count: true,
                },
              },
              Tags: {
                select: {
                  Tag: {
                    select: {
                      id: true,
                      name: true,
                      description: true,
                      color: true,
                      createdAt: true,
                      updatedAt: true,
                      _count: true,
                    },
                  },
                },
              },
            },
          },
          User: {
            select: UserBase,
          },
          Participants: {
            select: {
              Participant: {
                select: UserBase,
              },
            },
          },
        },
      },
    },
  },
})
