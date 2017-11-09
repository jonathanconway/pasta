import React       from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import type { Template as TemplateModel } from '../models/Template'
import dummyTemplate                      from '../config/dummyTemplate'
import TemplatesList                      from '../components/TemplatesList'

const mapStateToProps = state => ({
  templates: state.templates
})

const mapDispatchToProps = dispatch => ({
  onAppendNewTemplate: () => dispatch({
    type: 'CREATE_NEW_TEMPLATE'
  }),
  onAppendNewMessage: (templateIndex) => dispatch({
    type: 'CREATE_NEW_MESSAGE',
    templateIndex
  }),
  onDeleteTemplate: (templateIndex) => dispatch({
    type: 'DELETE_TEMPLATE',
    templateIndex
  })
})

type Props = {
  templates: Array<TemplateModel>,
  onAppendNewTemplate: Function,
  onAppendNewMessage: Function,
  onDeleteTemplate: Function
}

const Component = ({
  templates,
  onAppendNewTemplate,
  onAppendNewMessage,
  onDeleteTemplate
}: Props) =>
  <TemplatesList
    templates={templates}
    
    onClickAddNewTemplate={onAppendNewTemplate}
    onClickAddNewMessage={onAppendNewMessage}
    onClickDeleteTemplate={onDeleteTemplate}
    
    ItemFillLink={({ index, children }) =>
      <NavLink to={`/fill/${(index || '0').toString()}`} onClick={() => onAppendNewMessage(parseInt(index || '0'))}>
        {children}
      </NavLink>
    }
    ItemEditLink={({ index, children }) =>
      <NavLink to={`/template/new/${(index || '0').toString()}`}>
        {children}
      </NavLink>
    }
    AddNewLink={({ children }) =>
      <NavLink to={`/template/new/${templates.length}`}>
        {children}
      </NavLink>
    }
  />

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)