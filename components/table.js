import crud from '/crud.js'
import {sortTable} from '../index.js'



export function table(resp, state) {

  const table = document.querySelector('.table')

  table.innerHTML = `<tr class="table__header">
        <th data-sort="Name">name <img src="https://img.icons8.com/ios-glyphs/30/000000/sort.png"/></th>
        <th data-sort="Description" >description<img src="https://img.icons8.com/ios-glyphs/30/000000/sort.png"/></th>
        <th data-sort="Date">date<img src="https://img.icons8.com/ios-glyphs/30/000000/sort.png"/></th>
        <th>actions</th>
      </tr>`
  let res = [...resp]
  if (state?.input) {

    res = resp.filter(obj => {
      return obj.Name.toLowerCase() === state.input.toLowerCase()
    })
  }
  res.forEach(obj => {
    const html = `
        <tr>
          <th>${obj.Name}</th>
          <th>${obj.Description}</th>
          <th>${obj.Date}</th>
          <th class="actions">
            <button class="actions__button" data-type="edit" data-id=${obj.id}>
              <img src="https://img.icons8.com/ios-glyphs/30/000000/edit--v1.png"/>
            </button>
            <button class="actions__button" data-type="delete" data-id=${obj.id}>
              <img src="https://img.icons8.com/ios/50/000000/delete-forever--v1.png"/>
            </button>
          </th>
        </tr>
      `
    table.insertAdjacentHTML('beforeend', html)
    table.querySelectorAll(`[data-id="${obj.id}"]`).forEach(node => {

      node.addEventListener('click',
        function (event) {
          if (node.dataset.type === 'edit') {
            document.querySelector('.modal').style.display = 'block'
            const modalForm = document.querySelector('.modal__form')
            for( let i=0; i<modalForm.elements.length - 1; i++ ) {
                modalForm.elements[i].value = obj[modalForm.elements[i].name]
              }
            state.isEdit = true
            state.changeId = obj.id
          } else if (node.dataset.type === 'delete') {
            crud.delete(obj.id).then(() => {
              crud.get().then(resp => {
                state.data = resp
                sortTable(resp, state)
              })
            })
          }


        })
      })


  }
  )

  document.querySelector('.table__header').childNodes.forEach(node => {
    if(node.dataset?.sort) {
      node.addEventListener('click', () => {
        const filterArr = [...resp]
        if (node.dataset?.sort === 'Date') {
          filterArr.sort((a,b) => {
            if (state.isFiltered) {
              return new Date(a["Date"]) - new Date(b["Date"])
            } else {
              return new Date(b["Date"]) - new Date(a["Date"])
            }
          } )
        } else if (node.dataset?.sort === 'Name') {
          filterArr.sort((a, b) => {

              if (a.Name < b.Name)
                return state.isFiltered ? 1 : -1
              if (a.Name > b.Name)
                return state.isFiltered ? -1 : 1
              return 0
            }
          )
        } else if (node.dataset?.sort === 'Description') {
          filterArr.sort((a, b) => {

              if (a.Description < b.Description)
                return state.isFiltered ? 1 : -1
              if (a.Description > b.Description)
                return state.isFiltered ? -1 : 1
              return 0
            }
          )
        }
        state.isFiltered = !state.isFiltered
        sortTable(filterArr)
      })
    }
  })
}

