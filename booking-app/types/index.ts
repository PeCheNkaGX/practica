export interface Resource {
  id: string
  name: string
  type: 'photographer' | 'conference-room' | 'equipment' | 'other'
  responsiblePerson?: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface Booking {
  id: string
  resourceId: string
  resourceName?: string
  startTime: string
  endTime: string
  participants?: string[]
  comment?: string
  createdBy: string
  createdAt: string
}

export interface BookingFormData {
  resourceId: string
  startTime: string
  endTime: string
  participants: string[]
  comment: string
}