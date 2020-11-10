module.exports = {
  skipComponentsWithoutExample: true,
  sections: [
    {
      name: 'Avatar',
      components: 'src/components/shared/Avatar.jsx',
      description:
        'This is a reusable Avatar component that can show Avatar image',
    },
    {
      name: 'DoubleAvatar',
      components: 'src/components/shared/DoubleAvatar.jsx',
      description:
        'This is a double avatars components that can be used in multi-friends chatrooms',
    },
    {
      name: 'Button',
      components: 'src/components/shared/Button.jsx',
      description:
        'This is a reusable Button component which the styles can be easily modified and extended',
    },
    {
      name: 'Input',
      components: 'src/components/shared/Input.jsx',
      description:
        'This is a reusable Input component can be used in different field',
    },
    {
      name: 'Selector',
      components: 'src/components/shared/Selector.jsx',
      description:
        'This is a reusable Selector component can be used to choose options, the component is built on top of react-select',
    },
  ],
}
