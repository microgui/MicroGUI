import React from 'react'
import { useNode } from '@craftjs/core'
import { EditSection } from "../../tools/editbox/EditSection"
import { EditItem } from "../../tools/editbox/EditItem"

export const ContainerSettings = () => {
  const { nodeName } = useNode((node) => ({
    nodeName: node.data.custom.displayName || node.data.displayName,
  }))

  return (
    <React.Fragment>
      <h4>{nodeName} Settings</h4>

      <EditSection
        title="Background"
        props={["backgroundColor"]}
        summary={({ backgroundColor }) => {
          return (
            <div
              style={{
                backgroundColor: `rgba(${Object.values(backgroundColor)})`,
                borderRadius: "50%",
                height: "20px",
                width: "20px",
              }}
            />
          )
        }}
      >
        <EditItem propKey="backgroundColor" type="color" label="Background Color" />
      </EditSection>

      <EditSection
        title="Padding"
        props={["padding"]}
        summary={({ padding }) => {
          return `${padding}px`
        }}
      >
        <EditItem propKey="padding" type="number" label="Padding" />
      </EditSection>

      <EditSection
        title="Border"
        props={["border"]}
        summary={({ border }) => {
          return border
        }}
      >
        <EditItem propKey="border" type="text" label="Border" />
      </EditSection>

      <EditSection
        title="Border Radius"
        props={["borderRadius"]}
        summary={({ borderRadius }) => {
          return `${borderRadius}px`
        }}
      >
        <EditItem propKey="borderRadius" type="number" label="Border Radius" />
      </EditSection>
    </React.Fragment>
  )
}
