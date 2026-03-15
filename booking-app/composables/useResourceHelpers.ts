export const useResourceHelpers = () => {
  const getResourceIcon = (type: string) => {
    const icons = {
      photographer: 'mdi-camera',
      'conference-room': 'mdi-sofa',
      equipment: 'mdi-projector',
      other: 'mdi-help-circle'
    }
    return icons[type as keyof typeof icons] || icons.other
  }

  const getResourceTypeName = (type: string) => {
    const names = {
      photographer: 'Фотограф',
      'conference-room': 'Конференц-зал',
      equipment: 'Оборудование',
      other: 'Другое'
    }
    return names[type as keyof typeof names] || names.other
  }

  const resourceTypes = [
    { title: 'Фотограф', value: 'photographer' },
    { title: 'Конференц-зал', value: 'conference-room' },
    { title: 'Оборудование', value: 'equipment' },
    { title: 'Другое', value: 'other' }
  ]

  return {
    getResourceIcon,
    getResourceTypeName,
    resourceTypes
  }
}