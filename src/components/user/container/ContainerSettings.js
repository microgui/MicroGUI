import React from 'react'
import { useNode } from '@craftjs/core'
import { EditSection } from "../../tools/editbox/EditSection"
import { EditItem } from "../../tools/editbox/EditItem"

export const ContainerSettings = () => {
  const { nodeName, childrenJustify, childrenAlign } = useNode((node) => ({
    nodeName: node.data.custom.displayName || node.data.displayName,
    childrenJustify: node.data.props.childrenJustify,
    childrenAlign: node.data.props.childrenAlign,
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
        title="Border"
        props={["border"]}
        summary={({ border }) => {
          return border
        }}
      >
        <EditItem propKey="border" type="text" label="Border" />
      </EditSection>

      <EditSection
        title="Children Alignment"
        props={["childrenJustify", "childrenAlign"]}
        summary={() => { return `Horizontal: ${childrenJustify}, Vertical: ${childrenAlign}` }}

      >
        <EditItem
          propKey="childrenJustify"
          type="select"
          label="Horizontal Alignment"
          options={[
            { value: 'flex-start', label: 'Start' },
            { value: 'center', label: 'Center' },
            { value: 'flex-end', label: 'End' },
            { value: 'space-between', label: 'Space Between' },
            { value: 'space-around', label: 'Space Around' },
            { value: 'space-evenly', label: 'Space Evenly' },
          ]}
        />
        <EditItem
          propKey="childrenAlign"
          type="select"
          label="Vertical Alignment"
          options={[
            { value: 'flex-start', label: 'Start' },
            { value: 'center', label: 'Center' },
            { value: 'flex-end', label: 'End' },
            { value: 'stretch', label: 'Stretch' },
            { value: 'baseline', label: 'Baseline' },
          ]}
        />
      </EditSection>
    </React.Fragment>
  )
}
