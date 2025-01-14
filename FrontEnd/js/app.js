const API_ACTIVIDADES = 'http://localhost:3000/api/actividades';
const API_PARCELAS = 'http://localhost:3000/api/parcelas';

const activityModal = new bootstrap.Modal(document.getElementById('activityModal'));
const parcelModal = new bootstrap.Modal(document.getElementById('parcelModal'));

// Cargar actividades y parcelas al inicio
document.addEventListener('DOMContentLoaded', () => {
  fetchActivities();
  fetchParcels();

  document.getElementById('activityForm').addEventListener('submit', saveActivity);
  document.getElementById('parcelForm').addEventListener('submit', saveParcel);
});
// Obtener y mostrar todas las actividades
function fetchActivities() {
  fetch(API_ACTIVIDADES)
    .then((response) => response.json())
    .then((data) => {
      const activityTable = document.getElementById('activityTable');
      activityTable.innerHTML = '';
      data.forEach((activity) => {
        activityTable.innerHTML += `
          <tr>
            <td>${activity.fecha}</td>
            <td>${activity.tipo}</td>
            <td>${activity.insumos || '-'}</td>
            <td>${activity.duracion}</td>
            <td>
              <button class="btn btn-warning btn-sm" onclick="editActivity(${activity.id})">Editar</button>
              <button class="btn btn-danger btn-sm" onclick="deleteActivity(${activity.id})">Eliminar</button>
            </td>
          </tr>
        `;
      });
    })
    .catch((err) => console.error('Error al obtener actividades:', err));
}

// Abrir el modal para agregar una actividad
function openAddModal() {
  resetForm();
  document.getElementById('activityModalLabel').textContent = 'Agregar Actividad';
  activityModal.show();
}

// Abrir el modal para editar una actividad
function editActivity(id) {
  fetch(`${API_ACTIVIDADES}/${id}`)
    .then((response) => response.json())
    .then((activity) => {
      document.getElementById('activityId').value = activity.id;
      document.getElementById('fecha').value = activity.fecha;
      document.getElementById('tipo').value = activity.tipo;
      document.getElementById('insumos').value = activity.insumos;
      document.getElementById('duracion').value = activity.duracion;

      document.getElementById('activityModalLabel').textContent = 'Editar Actividad';
      activityModal.show();
    })
    .catch((err) => console.error('Error al obtener actividad:', err));
}

// Guardar o actualizar una actividad
function saveActivity(e) {
  e.preventDefault();

  const id = document.getElementById('activityId').value;
  const fecha = document.getElementById('fecha').value;
  const tipo = document.getElementById('tipo').value;
  const insumos = document.getElementById('insumos').value;
  const duracion = document.getElementById('duracion').value;

  const activity = { fecha, tipo, insumos, duracion };

  const request = id
    ? fetch(`${API_ACTIVIDADES}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activity),
      })
    : fetch(API_ACTIVIDADES, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activity),
      });

  request
    .then(() => {
      resetForm();
      activityModal.hide();
      fetchActivities();
    })
    .catch((err) => console.error('Error al guardar actividad:', err));
}

// Eliminar una actividad
function deleteActivity(id) {
  fetch(`${API_ACTIVIDADES}/${id}`, { method: 'DELETE' })
    .then(() => fetchActivities())
    .catch((err) => console.error('Error al eliminar actividad:', err));
}

// Resetear el formulario
function resetForm() {
  document.getElementById('activityForm').reset();
  document.getElementById('activityId').value = '';
}

// Obtener todas las parcelas
function fetchParcels() {
    fetch(API_PARCELAS)
      .then((response) => response.json())
      .then((data) => {
        const parcelTable = document.getElementById('parcelTable');
        parcelTable.innerHTML = '';
        data.forEach((parcel) => {
          parcelTable.innerHTML += `
            <tr>
              <td>${parcel.ubicacion}</td>
              <td>${parcel.tamano}</td>
              <td>${parcel.cultivo}</td>
              <td>
                <button class="btn btn-warning btn-sm" onclick="editParcel(${parcel.id})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteParcel(${parcel.id})">Eliminar</button>
              </td>
            </tr>
          `;
        });
      })
      .catch((err) => console.error('Error al obtener parcelas:', err));
  }
  
  // Abrir el modal para agregar una nueva parcela
  function openAddParcelModal() {
    resetParcelForm();
    document.getElementById('parcelModalLabel').textContent = 'Agregar Parcela';
    parcelModal.show();
  }
  
  // Editar una parcela existente
  function editParcel(id) {
    fetch(`${API_PARCELAS}/${id}`)
      .then((response) => response.json())
      .then((parcel) => {
        document.getElementById('parcelId').value = parcel.id;
        document.getElementById('ubicacion').value = parcel.ubicacion;
        document.getElementById('tamano').value = parcel.tamano;
        document.getElementById('cultivo').value = parcel.cultivo;
  
        document.getElementById('parcelModalLabel').textContent = 'Editar Parcela';
        parcelModal.show();
      })
      .catch((err) => console.error('Error al obtener parcela:', err));
  }
  
  // Guardar o actualizar una parcela
  function saveParcel(e) {
    e.preventDefault();
  
    const id = document.getElementById('parcelId').value;
    const ubicacion = document.getElementById('ubicacion').value;
    const tamano = document.getElementById('tamano').value;
    const cultivo = document.getElementById('cultivo').value;
  
    const parcel = { ubicacion, tamano, cultivo };
  
    const request = id
      ? fetch(`${API_PARCELAS}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(parcel),
        })
      : fetch(API_PARCELAS, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(parcel),
        });
  
    request
      .then(() => {
        resetParcelForm();
        parcelModal.hide();
        fetchParcels();
      })
      .catch((err) => console.error('Error al guardar parcela:', err));
  }
  
  // Eliminar una parcela
  function deleteParcel(id) {
    fetch(`${API_PARCELAS}/${id}`, { method: 'DELETE' })
      .then(() => fetchParcels())
      .catch((err) => console.error('Error al eliminar parcela:', err));
  }
  
  // Resetear el formulario de parcelas
  function resetParcelForm() {
    document.getElementById('parcelForm').reset();
    document.getElementById('parcelId').value = '';
  }
  
