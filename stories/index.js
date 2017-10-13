import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Template from '../src/components/Template'
storiesOf('Template', module)
  .add('default', () => <Template />)

import FillInTemplateForm from '../src/components/FillInTemplateForm'
storiesOf('FillInTemplateForm', module)
  .add('default', () => <FillInTemplateForm />)

import LabelAndInput from '../src/components/LabelAndInput'
storiesOf('LabelAndInput', module)
  .add('default', () => <LabelAndInput />)

import TemplatesList from '../src/components/TemplatesList'
storiesOf('TemplatesList', module)
  .add('default', () => <TemplatesList />)

import Nav from '../src/components/Nav'
storiesOf('Nav', module)
  .add('default', () => <Nav />)

import SendMessageForm from '../src/components/SendMessageForm'
storiesOf('SendMessageForm', module)
  .add('default', () => <SendMessageForm />)
  
import AuthorTemplateForm from '../src/components/AuthorTemplateForm'
storiesOf('AuthorTemplateForm', module)
  .add('default', () => <AuthorTemplateForm />)