const crud  = {

  async add({Name: name, Description: description, Date: date}) {
    const resp = await fetch('http://212.98.184.15:8080/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "Name": name,
        "Description": description,
        "Date": date
      })
    })
    if (resp.status === 200) {
      return resp.json()
    } else {
      return new Error('Bad request')
    }
  },
  async get() {
    const resp = await fetch('http://212.98.184.15:8080/users', {
      method: 'GET'
    })

    if (resp.status === 200) {
      return await resp.json()
    } else {
      return new Error('Bad request')
    }
  },
  async delete(id) {
    const resp = await fetch(`http://212.98.184.15:8080/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain, */*; charset=utf-8',
        'Content-Type': 'application/json'
      }
    })
    // console.log(resp)
    // console.log(resp.data?.message)
    if (resp.status === 200) {

    } else {
      return new Error('Bad request')
    }
  },
  async edit(id,obj) {
    const {Name:name, Description: description, Date:date} = obj
    console.log(name, description, date)
    const resp = await fetch(`http://212.98.184.15:8080/edit/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "Name": name,
        "Description": description,
        "Date": date
      })
    })
    if (resp.status === 200) {
      return resp.json()
    } else {
      return new Error('Bad request')
    }
  }
}
export default crud;