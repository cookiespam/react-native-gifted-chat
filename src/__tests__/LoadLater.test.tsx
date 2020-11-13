import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import { LoadLater } from '../GiftedChat'

it('should render <LoadLater /> and compare with snapshot', () => {
  const tree = renderer.create(<LoadLater />).toJSON()

  expect(tree).toMatchSnapshot()
})
