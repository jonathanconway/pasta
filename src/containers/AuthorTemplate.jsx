import React from 'react'

import type { Template as TemplateModel } from '../models/Template'

import styled from 'styled-components'
import { NavLinkButton } from '../components/commonStyles'

import { Route } from 'react-router'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import dummyTemplate from '../config/dummyTemplate'
import AuthorTemplateForm from '../components/AuthorTemplateForm'

const mapStateToProps = state => ({
  templates: state.templates
})

const mapDispatchToProps = dispatch => ({
  onChangeText: (templateIndex, text) => dispatch({
    type: 'SET_TEMPLATE_TEXT',
    templateIndex,
    text
  }),
  onClickInsertField: (templateIndex, selectionStart) => dispatch({
    type: 'INSERT_FIELD_INTO_TEMPLATE',
    templateIndex,
    selectionStart
  }),
  onClickUseForNewMessage: (templateIndex) => dispatch({
    type: 'CREATE_NEW_MESSAGE',
    templateIndex
  })
})

type Props = {
  templates: Array<TemplateModel>,
  onChangeText: Function,
  onClickInsertField: Function,
  onClickUseForNewMessage: Function
}

const Component = ({
  templates,
  onChangeText,
  onClickInsertField,
  onClickUseForNewMessage
}: Props) =>
  <Route path="/author/:templateIndex" render={({ match: { params: { templateIndex } } }) =>
    ((templateIndex) =>
      <AuthorTemplateForm
        template={templates[templateIndex] || {}}
        
        BackLink={({ children }) =>
          <NavLink to={`/list`}>
            {children}
          </NavLink>
        }
        UseLink={({ children }) =>
          <NavLink to={`/fill/${templateIndex}`} onClick={() => onClickUseForNewMessage(templateIndex)}>
            {children}
          </NavLink>
        }

        onChangeText={text => onChangeText(parseInt(templateIndex), text)}
        onClickInsertField={selectionStart => onClickInsertField(parseInt(templateIndex), selectionStart)}
      />
    )(parseInt(templateIndex))
  } />

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)