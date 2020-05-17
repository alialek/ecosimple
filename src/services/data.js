import { ReactComponent as LampIcon } from '../img/icons/lamp.svg';
import React from 'react';
const data = [
  {
    id: 'paper',
    name: 'Макулатура',
    sections: [
      {
        title: 'Что можно сдавать',
        type: 'scroll',
        content: [
          {
            name: 'Макулатура',
            icon: <LampIcon />,
            tooltip: 'Только в чистом виде'
          }
        ]
      },
      {
        title: 'Что нельзя сдавать',
        type: 'scroll',
        content: [
          {
            name: 'Макулатура',
            icon: '',
            tooltip: 'Только в чистом виде'
          }
        ]
      },
      {
        title: 'Как сдавать',
        type: 'checklist',
        content: [
          {
            name:
              'Отчистить от скрепок и пластиковых предметов, снять ламинацию',
            description: ''
          }
        ]
      },
      {
        title: 'Как сдавать',
        type: 'list',
        content: [
          {
            icon: <LampIcon />,
            name:
              'Отчистить от скрепок и пластиковых предметов, снять ламинацию',
            description: 'Долгое Долгое Долгое Долгое Долгое Долгое Долгое Долгое Долгое Долгое '
          }
        ]
      }
    ]
  }
];

export default data;
