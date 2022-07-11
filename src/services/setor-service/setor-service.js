// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

export async function findSectorByLeader() {
  const mapaSetorGestor = {
    'rcavalcante@iblueconsulting.com.br': true,
    'mgraca@iblueconsulting.com.br': true,
    'lmurrer@iblueconsulting.com.br': true,
    'cpinho@iblueconsulting.com.br': true,
    'lrosa@iblueconsulting.com.br': true,
    'rprudente@iblueconsulting.com.br': true,
    'cpassos@iblueconsulting.com.br': true,
  };
  const token = localStorage.getItem('token');
  const decoded = jwt_decode(token);
  const data = {
    Email: decoded.email,
    SetorId: decoded.setorId.toString(),
  };
  return mapaSetorGestor[data.Email] ?? false;
}
