export const ACTIONS = {
  WAIT: "WAIT",
  IF: "IF",
  SIMPLE_IF: "SIMPLE_IF",
  GO_TO: "GO_TO",
  PERFORM_MATH: "PERFORM_MATH",
  ADD_TAGS: "ADD_TAGS",
  REMOVE_TAGS: "REMOVE_TAGS",
  CREATE_TASK: "createTask",
  CREATE_TICKET: "createTicket",
  CREATE_DEAL: "createDeal",
  REMOVE_DEAL: "REMOVE_DEAL",
};

export const TRIGGERS = {
  FORM_SUBMIT: 'formSubmit',
  CRONJOB: 'cronJob',
  WEBSITE_VISITED: 'websiteVisited',

  DEAL_CREATE: 'dealCreate',
  TICKET_CREATE: 'ticketCreate',
  TASK_CREATE: 'taskCreate',
  DEAL_UPDATE: 'dealUpdate',
  TICKET_UPDATE: 'ticketUpdate',
  TASK_UPDATE: 'taskUpdate',
  DEAL_DELETE: 'dealDelete',
  TICKET_DELETE: 'ticketDelete',
  TASK_DELETE: 'taskDelete',

}
