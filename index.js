import crud from '/crud.js'
import {table as tableHtml} from './components/table.js'





const state = {
  input: '',
  data: [],
  isEdit: false,
  changeId: null,
  isFiltered: true
}




crud.get().then(resp => {
  state.data = resp
  tableHtml(resp, state)
})

const modalForm = document.querySelector('.modal__form')
modalForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const obj = {}
  for( let i=0; i<modalForm.elements.length - 1; i++ )
    {
      const fieldName = modalForm.elements[i].name;
      const fieldValue = modalForm.elements[i].value;
      obj[fieldName] = fieldValue
    }
  if (state.isEdit) {
    crud.edit(state.changeId, obj).then(() => {
      modalForm.reset()
      crud.get().then(resp => {
        tableHtml(resp, state)
        state.data = resp
      })
    })
    document.querySelector('.modal').style.display = "none"
  } else {
    crud.add(obj).then(() => {
      crud.get().then(resp => {
        tableHtml(resp,state)
        state.data = resp
      })
    })
    modalForm.reset()
    document.querySelector('.modal').style.display = "none"

  }
})




document
  .querySelector('.add')
  .addEventListener('click',(event) => {
  state.isEdit = false
  document.querySelector('.modal').style.display = "block"

})
document
  .querySelector('.modal')
  .addEventListener('click', (event) => {
  if (event.target === document.querySelector('.modal')) {
      modalForm.reset()

      event.target.style.display = 'none'
  }
})


document
  .querySelector('.search__input')
  .addEventListener('input', function (event) {
    state.input = (event.target.value)

  })

export const sortTable = (resp) => {
  tableHtml(resp, state)
}



document
  .querySelector('.search__button')
  .addEventListener('click', function (event) {
    tableHtml(state.data, state)
  })






