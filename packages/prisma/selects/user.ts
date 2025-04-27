import { Prisma } from '../generated/client'
import { CampaignBase } from './campaign'
import { ConstructionCompanyBase } from './constructionCompany'
import { ContactBase } from './contact'
import { CustomerBase } from './customer'
import {
  LeadBase,
  LeadCommentBase,
  LeadDocumentBase,
  LeadLostReasonBase,
} from './lead'
import { PermissionBase } from './permission'
import { ProjectBase } from './project'
import { ScheduleBase } from './schedule'
import { SourceBase } from './source'
import { TagBase } from './tag'

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
        select: PermissionBase,
      },
    },
  },
  Leads: {
    select: {
      ...LeadBase,
      Customer: {
        select: CustomerBase,
      },
      Campaigns: {
        select: {
          Campaign: {
            select: {
              ...CampaignBase,
              Source: {
                select: SourceBase,
              },
              Project: {
                select: {
                  ...ProjectBase,
                  ConstructionCompany: {
                    select: {
                      ...ConstructionCompanyBase,
                      Contacts: {
                        select: ContactBase,
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
        select: LeadLostReasonBase,
      },
      Tags: {
        select: {
          Tag: {
            select: TagBase,
          },
        },
      },
    },
  },
  LeadComments: {
    select: {
      ...LeadCommentBase,
      Lead: {
        select: {
          ...LeadBase,
          Broker: {
            select: UserBase,
          },
          Customer: {
            select: CustomerBase,
          },
          Campaigns: {
            select: {
              Campaign: {
                select: {
                  ...CampaignBase,
                  Source: {
                    select: SourceBase,
                  },
                  Project: {
                    select: {
                      ...ProjectBase,
                      ConstructionCompany: {
                        select: {
                          ...ConstructionCompanyBase,
                          Contacts: {
                            select: ContactBase,
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
            select: LeadLostReasonBase,
          },
          Tags: {
            select: {
              Tag: {
                select: TagBase,
              },
            },
          },
        },
      },
    },
  },
  LeadDocuments: {
    select: {
      ...LeadDocumentBase,
      Lead: {
        select: {
          ...LeadBase,
          Broker: {
            select: UserBase,
          },
          Customer: {
            select: CustomerBase,
          },
          Campaigns: {
            select: {
              Campaign: {
                select: {
                  ...CampaignBase,
                  Source: {
                    select: SourceBase,
                  },
                  Project: {
                    select: {
                      ...ProjectBase,
                      ConstructionCompany: {
                        select: {
                          ...ConstructionCompanyBase,
                          Contacts: {
                            select: ContactBase,
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
            select: LeadLostReasonBase,
          },
          Tags: {
            select: {
              Tag: {
                select: TagBase,
              },
            },
          },
        },
      },
    },
  },
  Schedules: {
    select: {
      ...ScheduleBase,
      Lead: {
        select: {
          ...LeadBase,
          Broker: {
            select: UserBase,
          },
          Customer: {
            select: CustomerBase,
          },
          Campaigns: {
            select: {
              Campaign: {
                select: {
                  ...CampaignBase,
                  Source: {
                    select: SourceBase,
                  },
                  Project: {
                    select: {
                      ...ProjectBase,
                      ConstructionCompany: {
                        select: {
                          ...ConstructionCompanyBase,
                          Contacts: {
                            select: ContactBase,
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
            select: LeadLostReasonBase,
          },
          Tags: {
            select: {
              Tag: {
                select: TagBase,
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
          User: {
            select: UserBase,
          },
          ...ScheduleBase,
          Lead: {
            select: {
              ...LeadBase,
              Broker: {
                select: UserBase,
              },
              Customer: {
                select: CustomerBase,
              },
              Campaigns: {
                select: {
                  Campaign: {
                    select: {
                      ...CampaignBase,
                      Source: {
                        select: SourceBase,
                      },
                      Project: {
                        select: {
                          ...ProjectBase,
                          ConstructionCompany: {
                            select: {
                              ...ConstructionCompanyBase,
                              Contacts: {
                                select: ContactBase,
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
                select: LeadLostReasonBase,
              },
              Tags: {
                select: {
                  Tag: {
                    select: TagBase,
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
    },
  },
})
