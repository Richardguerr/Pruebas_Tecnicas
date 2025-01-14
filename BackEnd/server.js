const express = require('express');
const mysql = require('mysql2');  // Usando mysql2 en lugar de sqlite3
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PORT = process.env.DB_PORT || 3306;

// Middleware
app.use(express.json());
app.use(cors());

// Configuración de la base de datos
const db = mysql.createConnection({
  host: 'db',  // Nombre del contenedor de MySQL
  user: 'root',
  password: 'password',  // Contraseña de MySQL, ajústala según tu configuración
  database: 'agronomico',
  port: DB_PORT // Usando el puerto correcto
});

// Conexión a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión a MySQL exitosa.');

    // Crear tablas si no existen
    db.query(`
      CREATE TABLE IF NOT EXISTS actividades (
        id INT AUTO_INCREMENT PRIMARY KEY,
        fecha VARCHAR(255) NOT NULL,
        tipo VARCHAR(255) NOT NULL,
        insumos TEXT,
        duracion INT
      )`, (err) => {
        if (err) {
          console.error('Error creando la tabla de actividades:', err);
        }
      });

    db.query(`
      CREATE TABLE IF NOT EXISTS parcelas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ubicacion VARCHAR(255) NOT NULL,
        tamano FLOAT NOT NULL,
        cultivo VARCHAR(255) NOT NULL
      )`, (err) => {
        if (err) {
          console.error('Error creando la tabla de parcelas:', err);
        }
      });
  }
});

// Routes
// Obtener todas las actividades
app.get('/api/actividades', (req, res) => {
  db.query('SELECT * FROM actividades', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Crear una nueva actividad
app.post('/api/actividades', (req, res) => {
  const { fecha, tipo, insumos, duracion } = req.body;
  db.query(
    'INSERT INTO actividades (fecha, tipo, insumos, duracion) VALUES (?, ?, ?, ?)',
    [fecha, tipo, insumos, duracion],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ id: this.lastID });
      }
    }
  );
});

// Obtener todas las parcelas
app.get('/api/parcelas', (req, res) => {
  db.query('SELECT * FROM parcelas', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Crear una nueva parcela
app.post('/api/parcelas', (req, res) => {
  const { ubicacion, tamano, cultivo } = req.body;
  db.query(
    'INSERT INTO parcelas (ubicacion, tamano, cultivo) VALUES (?, ?, ?)',
    [ubicacion, tamano, cultivo],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ id: this.lastID });
      }
    }
  );
});

// Editar una actividad
app.put('/api/actividades/:id', (req, res) => {
  const { id } = req.params;
  const { fecha, tipo, insumos, duracion } = req.body;
  db.query(
    `UPDATE actividades SET fecha = ?, tipo = ?, insumos = ?, duracion = ? WHERE id = ?`,
    [fecha, tipo, insumos, duracion, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: 'Actividad actualizada exitosamente.' });
      }
    }
  );
});

// Obtener una actividad por ID
app.get('/api/actividades/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM actividades WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row.length) {
      res.status(404).json({ message: 'Actividad no encontrada' });
    } else {
      res.json(row[0]);
    }
  });
});

// Eliminar una actividad
app.delete('/api/actividades/:id', (req, res) => {
  const { id } = req.params;
  db.query(
    `DELETE FROM actividades WHERE id = ?`,
    [id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: 'Actividad eliminada exitosamente.' });
      }
    }
  );
});

// Editar una parcela
app.put('/api/parcelas/:id', (req, res) => {
  const { id } = req.params;
  const { ubicacion, tamano, cultivo } = req.body;
  db.query(
    `UPDATE parcelas SET ubicacion = ?, tamano = ?, cultivo = ? WHERE id = ?`,
    [ubicacion, tamano, cultivo, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: 'Parcela actualizada exitosamente.' });
      }
    }
  );
});

// Eliminar una parcela
app.delete('/api/parcelas/:id', (req, res) => {
  const { id } = req.params;
  db.query(
    `DELETE FROM parcelas WHERE id = ?`,
    [id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: 'Parcela eliminada exitosamente.' });
      }
    }
  );
});

// Obtener una parcela por ID
app.get('/api/parcelas/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM parcelas WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row.length) {
      res.status(404).json({ message: 'Parcela no encontrada' });
    } else {
      res.json(row[0]);
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
