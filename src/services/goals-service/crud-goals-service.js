import { api } from '../../boot/axios';

export async function findGlobalGoals(typeGoalId) {
  try {
    // o tipo da meta global é 1
    const response = await api.get(`meta-global?tipoId=${typeGoalId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
}

export async function findSectorialGoals(typeGoalId, sectorId) {
  try {
    // o tipo da meta setorial é 2
    const response = await api.get(`meta-setorial?tipoId=${typeGoalId}&setorId=${sectorId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // the token is a variable which holds the token
      },
    });

    return response;
  } catch (error) {
    return error;
  }
}

export async function findIndividualGoals(userEmail) {
  try {
    // o tipo da meta setorial é 3
    const response = await api.get(`meta-individual?email=${userEmail}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // the token is a variable which holds the token
      },
    });

    return response;
  } catch (error) {
    return error;
  }
}

export async function createGlobalGoal(data) {
  try {
    const response = await api.post('meta-global', data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // the token is a variable which holds the token
      },
    });

    return response;
  } catch (error) {
    return error;
  }
}

export async function createSectorialGoal(data) {
  try {
    const response = await api.post('meta-setorial', data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // the token is a variable which holds the token
      },
    });

    return response;
  } catch (error) {
    return error;
  }
}

export async function createIndividualGoal(data) {
  try {
    const response = await api.post('meta-individual', data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // the token is a variable which holds the token
      },
    });

    return response;
  } catch (error) {
    return error;
  }
}
