import { $ } from '@builder.io/qwik';
import { App } from './models/app';
import { Directory } from './models/directory';
import { PersonalNotification } from './models/personal-notification';
import { TerminalState } from './models/terminal-state';
import ViewIntroduction from './components/view-introduction/view-introduction';
import ViewContact from './components/view-contact/view-contact';
import ViewProjects from './components/view-projects/view-projects';
import ViewSettings from './components/view-settings/view-settings';


/**
 * directory of desktop apps available (static data) that will show on desktop
 */
export const apps: Directory<App> = {
    'Introduction': {
      name: 'Introduction',
      icon: {
        name: 'document',
      },
      content: $(() => <ViewIntroduction />),
    },
    'Projects': {
      name: 'Projects',
      icon: {
        name: 'folder',
      },
      content: $(() => <ViewProjects />),
    },
    'Contact Me': {
      icon: {
        name: 'mail',
      },
      name: 'Contact Me',
      content: $(() => <ViewContact />),
    },
    'Settings': {
      icon: {
        name: 'settings',
      },
      name: 'Settings',
      content: $(() => <ViewSettings />),
    },
}

export const states: Directory<PersonalNotification | TerminalState> = {
  'Contact Me': {
    title: '',
    contact: '',
    message: '',
  },
  'esolang': {
    input: '',
    output: '',
    program: 'esolang',
  }
}
