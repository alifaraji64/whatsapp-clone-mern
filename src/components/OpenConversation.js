import React, { useState } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'

const OpenConversation = () => {
  const [text, setText] = useState('')
  return (
    <div className='d-flex flex-column flex-grow-1'>
      <div className='flex-grow-1 overflow-auto'></div>
      <Form>
        <Form.Group>
          <InputGroup className='m-2'>
            <Form.Control
              as='textarea'
              type='text'
              required
              value={text}
              onChange={e => setText(e.target.value)}
              style={{ height: '75px', resize: 'none' }}
            />
            <Button type='submit'>Send</Button>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  )
}

export default OpenConversation
