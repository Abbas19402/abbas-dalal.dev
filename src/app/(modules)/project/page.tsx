import React from 'react'
import Page from '@modules/common/page'

const ProjectDetailContent = () => {
  return (
    <div>

    </div>
  )
}

const ProjectDetailPage = () => {
  return (
    <Page
      component={ProjectDetailContent}
      metadata={{
        title: "Project",
        description: "Project details and information",
      }}
    />
  )
}

export default ProjectDetailPage
