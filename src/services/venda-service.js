import { AbstractService } from './abstract-service';

class VendaService extends AbstractService {
  constructor() {
      super('/venda');
  }

  getVendas = (page, sort, direction = "asc") => {
    const params = [];
    page && params.push({name: 'page', value: page});
    sort && params.push({name: 'sort', value: `${sort},${direction}`});
    params.push({name: 'pageSize', value: 10});
    return this.get('/paginator', params);
  }

  create = (venda) => {
    return new Promise((resolve) => {
      this.post('', venda).then(res => {
        if(res.status === 200) {
          return res.json()
        }
        return null;
      }).then(r => {resolve(r)});
    })
  }

  update = (venda) => {
    return new Promise((resolve) => {
      this.put('/atualizar', venda).then(res => {
        if(res.status === 200) {
          return res.json()
        }
        return null;
      }).then(r => {resolve(r)});
    })
  }

  finish = (venda) => {
    return new Promise((resolve) => {
      this.post('/finalizar-venda', venda).then(res => {
        if(res.status === 200) {
          return res.json()
        }
        return null;
      }).then(r => {resolve(r)});
    })
  }
}

export default new VendaService();