import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import * as SWR from 'swr'

import PostsPage, {getStaticProps} from '../../pages/posts'

describe('Posts Page', () => {
  it('should select the first 5 posts', async () => {
    const {props} = await getStaticProps({})

    expect(props.posts).toHaveLength(5)
  })

  it('should render content', async () => {
    jest.spyOn(SWR, 'default')
    const intersectionObserverMock = () => ({
      observe: () => null,
      disconnect: () => null
    })
    window.IntersectionObserver = jest
      .fn()
      .mockImplementation(intersectionObserverMock)

    const {props} = await getStaticProps({})

    const {getByText} = render(<PostsPage {...props} />)

    expect(getByText('Recent Posts')).toBeInTheDocument()
  })
})
