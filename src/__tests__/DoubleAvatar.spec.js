import React from 'react'

import DoubleAvatar from 'components/shared/DoubleAvatar'
import { render } from 'test-utils'

test('show correct avatar photos and orders of avatar photos', () => {
  const { getAllByRole } = render(
    <DoubleAvatar
      width={30}
      height={30}
      photoURLs={[
        'https://s3.amazonaws.com/uifaces/faces/twitter/chrisslowik/128.jpg',
        'https://s3.amazonaws.com/uifaces/faces/twitter/kostaspt/128.jpg',
      ]}
    />
  )

  const avatarNodes = getAllByRole('img')

  expect(avatarNodes[0]).toHaveAttribute(
    'src',
    'https://s3.amazonaws.com/uifaces/faces/twitter/chrisslowik/128.jpg'
  )
  expect(avatarNodes[0]).toHaveStyle(
    'width: 20px; height: 20px; top: 10px; left: 0;'
  )

  expect(avatarNodes[1]).toHaveAttribute(
    'src',
    'https://s3.amazonaws.com/uifaces/faces/twitter/kostaspt/128.jpg'
  )
  expect(avatarNodes[1]).toHaveStyle(
    'width: 20px; height: 20px; left: 10px; top: 0;'
  )
})
