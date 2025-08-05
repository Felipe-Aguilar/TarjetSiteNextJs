'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import styles from './page.module.scss';

type Appointment = {
  id: string;
  userId: string;
  name: string;
  date: string;
  time: string;
  description: string;
  confirmed: boolean;
};

type UserData = {
  UUID: string;
  TokenId: string;
  Nom: string;
  AppP: string;
  AppM: string;
  // Puedes agregar más campos si los necesitas
};

export const metadata = {
    title: 'Agendar Citas - Tarjet',
    description: 'Agendar Citas- Tarjet',
};

export default function AppointmentScheduler() {
  const { data: session, status } = useSession();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [formData, setFormData] = useState<Omit<Appointment, 'id' | 'confirmed' | 'userId'>>({
    name: '',
    date: '',
    time: '',
    description: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Redirigir si no hay sesión
  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/login');
    }
  }, [status]);

  // Obtener datos del usuario cuando haya sesión
  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.name) {
        try {
          const response = await fetch(
            `https://souvenir-site.com/WebTarjet/APIUsuDtos/Usuario/${session.user.name}`
          );
          const data = await response.json();
          setUserData(data);
        } catch (error) {
          console.error('Error al obtener datos del usuario:', error);
        } finally {
          setLoadingUser(false);
        }
      }
    };

    if (status === 'authenticated') {
      fetchUserData();
    }
  }, [status, session]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session || !session.user) {
      alert('No se pudo identificar al usuario');
      return;
    }

    if (!formData.name || !formData.date || !formData.time) {
      alert('Por favor completa los campos requeridos');
      return;
    }

    if (editingId) {
      // Editar cita existente
      setAppointments(prev =>
        prev.map(app =>
          app.id === editingId ? { 
            ...formData, 
            id: editingId, 
            confirmed: app.confirmed,
            userId: app.userId
          } : app
        )
      );
      setEditingId(null);
    } else {
      // Agregar nueva cita
      const newAppointment: Appointment = {
        ...formData,
        id: Date.now().toString(),
        confirmed: false,
        userId: session.user.name || '',
      };
      setAppointments(prev => [...prev, newAppointment]);
    }

    // Limpiar formulario
    setFormData({
      name: '',
      date: '',
      time: '',
      description: '',
    });
  };

  const handleEdit = (id: string) => {
    const appointmentToEdit = appointments.find(app => app.id === id);
    if (appointmentToEdit) {
      const { confirmed, userId, ...rest } = appointmentToEdit;
      setFormData(rest);
      setEditingId(id);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta cita?')) {
      setAppointments(prev => prev.filter(app => app.id !== id));
    }
  };

  const toggleConfirmation = (id: string) => {
    setAppointments(prev =>
      prev.map(app =>
        app.id === id ? { ...app, confirmed: !app.confirmed } : app
      )
    );
  };

  const addToGoogleCalendar = (appointment: Appointment) => {
    // Formatear la fecha y hora para Google Calendar
    const [year, month, day] = appointment.date.split('-');
    const [hours, minutes] = appointment.time.split(':');
    
    // Crear objetos Date para el inicio y fin (asumimos 1 hora de duración)
    const startDate = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hours),
      parseInt(minutes)
    );
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // +1 hora
    
    // Formatear fechas para la URL
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, '');
    };
    
    // Crear la URL de Google Calendar
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      appointment.name
    )}&dates=${formatDate(startDate)}/${formatDate(
      endDate
    )}&details=${encodeURIComponent(
      appointment.description || 'Cita agendada'
    )}&sf=true&output=xml`;
    
    // Abrir en una nueva pestaña
    window.open(googleCalendarUrl, '_blank');
  };

  const addToAppleCalendar = (appointment: Appointment) => {
    // Formatear la fecha y hora
    const [year, month, day] = appointment.date.split('-');
    const [hours, minutes] = appointment.time.split(':');
    
    const startDate = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hours),
      parseInt(minutes)
    );
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // +1 hora
    
    // Crear URL webcal
    const webcalUrl = `webcal://p04-calendarws.icloud.com/ca/event?` +
      `title=${encodeURIComponent(appointment.name)}&` +
      `st=${startDate.toISOString()}&` +
      `et=${endDate.toISOString()}&` +
      `notes=${encodeURIComponent(appointment.description || 'Cita agendada')}`;
    
    window.location.href = webcalUrl;
  };

  // Filtrar citas solo del usuario actual
  const userAppointments = appointments.filter(
    app => app.userId === (session?.user?.name || '')
  );

  if (status === 'loading' || loadingUser) {
    return <div className={styles.loading}>Cargando...</div>;
  }

  // Función para formatear el nombre completo
  const getFullName = () => {
    if (!userData) return session?.user?.email || '';
    return `${userData.Nom} ${userData.AppP} ${userData.AppM}`.trim();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Agendador de Citas</h1>
      
      <div className={styles.userInfo}>
        {userData ? (
          <p>Agendando citas para: <strong>{getFullName()}</strong></p>
        ) : (
          <p>Agendando citas para: <strong>{session?.user?.email}</strong></p>
        )}
      </div>
      
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
            <label htmlFor="name">Nombre:</label>
            <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
            />
            </div>
        
            <div className={styles.formGroup}>
            <label htmlFor="date">Fecha:</label>
            <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
            />
            </div>
            
            <div className={styles.formGroup}>
            <label htmlFor="time">Hora:</label>
            <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
            />
            </div>
            
            <div className={styles.formGroup}>
            <label htmlFor="description">Descripción (opcional):</label>
            <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
            />
            </div>
            
            <button type="submit" className={styles.submitButton}>
            {editingId ? 'Actualizar Cita' : 'Agregar Cita'}
            </button>
        </form>
      
        <div className={styles.appointmentsList}>
        <h2>Mis Citas Agendadas</h2>
        
        {userAppointments.length === 0 ? (
            <p className={styles.noAppointments}>No tienes citas agendadas</p>
        ) : (
            <ul>
                {userAppointments.map(app => (
                <li key={app.id} className={styles.appointmentItem}>
                    <div className={styles.appointmentInfo}>
                        <h3>{app.name}</h3>
                        <p><strong>Fecha:</strong> {app.date} a las {app.time}</p>
                        {app.description && <p>{app.description}</p>}
                        <div className={styles.confirmationStatus}>
                            <span>Estado: </span>
                            <span className={app.confirmed ? styles.confirmed : styles.notConfirmed}>
                            {app.confirmed ? 'Confirmada' : 'No confirmada'}
                            </span>
                        </div>
                    </div>
                    <div className={styles.appointmentActions}>
                        <button 
                            onClick={() => toggleConfirmation(app.id)}
                            className={app.confirmed ? styles.unconfirmButton : styles.confirmButton}
                        >
                            {app.confirmed ? 'Desconfirmar' : 'Confirmar'}
                        </button>
                        
                        {app.confirmed && (
                          <>
                            <button
                              onClick={() => addToGoogleCalendar(app)}
                              className={styles.calendarButton}
                            >
                              Agregar a Google Calendar
                            </button>
                            <button
                              onClick={() => addToAppleCalendar(app)}
                              className={styles.calendarButton}
                            >
                              Agregar a Apple Calendar
                            </button>
                          </>
                        )}                        
                                            
                        <button 
                            onClick={() => handleEdit(app.id)}
                            className={styles.editButton}
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => handleDelete(app.id)}
                            className={styles.deleteButton}
                        >
                            Eliminar
                        </button>
                    </div>
                </li>
                ))}
            </ul>
        )}
      </div>
    </div>
  );
}