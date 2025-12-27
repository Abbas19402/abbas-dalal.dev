import React from 'react'
import Page from '@modules/common/page'
import ServicesTemplate from '@modules/services/template/ServicesTemplate'

const ServicePage = () => {
  return (
    <Page
      component={ServicesTemplate}
      metadata={{
        title: "Services - Abbas Ali Dalal",
        description: "Creative development, design engineering, 3D interactions, and performance optimization services",
      }}
    />
  )
}

export default ServicePage

