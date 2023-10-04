import { IMatche2 } from "../../Interfaces/matches/IMatche";

const allMatches: IMatche2[] = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: "São Paulo"
    },
    awayTeam: {
      teamName: "Grêmio"
    }
  },
  {
    id: 2,
    homeTeamId: 9,
    homeTeamGoals: 1,
    awayTeamId: 14,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: "Internacional"
    },
    awayTeam: {
      teamName: "Santos"
    }
  },
  {
    id: 3,
    homeTeamId: 4,
    homeTeamGoals: 3,
    awayTeamId: 11,
    awayTeamGoals: 0,
    inProgress: false,
    homeTeam: {
      teamName: "Corinthians"
    },
    awayTeam: {
      teamName: "Napoli-SC"
    }
  },
]

const matchesInProgress = [
  {
    id: 41,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: "São Paulo"
    },
    awayTeam: {
      teamName: "Internacional"
    }
  },
  {
    id: 42,
    homeTeamId: 6,
    homeTeamGoals: 1,
    awayTeamId: 1,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: "Ferroviária"
    },
    awayTeam: {
      teamName: "Avaí/Kindermann"
    }
  },
]

const matchesInProgressDB = [
  {
    id: 41,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: [{
      teamName: "São Paulo"
    }],
    awayTeam: [{
      teamName: "Internacional"
    }]
  },
  {
    id: 42,
    homeTeamId: 6,
    homeTeamGoals: 1,
    awayTeamId: 1,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: [{
      teamName: "Ferroviária"
    }],
    awayTeam: [{
      teamName: "Avaí/Kindermann"
    }]
  },
]

const matcheById = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: true,
  }
]

const matcheFinished = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: false,
  }
]

const isValidToken = {
  id: 1,
  email: 'admin@admin.com',
  role: 'admin',
  username: 'Admin',
}

const updateReq = {
  homeTeamGoals: 3,
  awayTeamGoals: 1
}

const createMatch = {
  homeTeamId: 16,
  homeTeamGoals: 1,
  awayTeamId: 2,
  awayTeamGoals: 2,
}

const createdMatch = {
  id: 1,
  homeTeamId: 16,
  homeTeamGoals: 1,
  awayTeamId: 2,
  awayTeamGoals: 2,
  inProgress: true,
}

const sameTeamMatch = {
  homeTeamId: 16,
  homeTeamGoals: 1,
  awayTeamId: 16,
  awayTeamGoals: 2,
}

const noTeamMatch = {
  homeTeamGoals: 1,
  awayTeamId: 16,
  awayTeamGoals: 2,
}

export {
  allMatches,
  matchesInProgress,
  matchesInProgressDB,
  matcheById,
  matcheFinished,
  isValidToken,
  updateReq,
  createMatch,
  createdMatch,
  sameTeamMatch,
  noTeamMatch,
}