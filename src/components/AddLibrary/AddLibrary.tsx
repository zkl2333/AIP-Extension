import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import './styles.css'
import { useSWRConfig } from 'swr'
import { useState } from 'react'

export const AddLibrary = () => {
  const { mutate } = useSWRConfig()
  const [libraryName, setLibraryName] = useState('')
  const [description, setDescription] = useState('')

  const handerCreate = async () => {
    await fetch('https://aiproxy.io/api/library/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        libraryName,
        description
      })
    })
    mutate(['https://aiproxy.io/api/library/list', ''])
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className='btn btn-primary'>创建知识库</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='DialogOverlay' />
        <Dialog.Content className='DialogContent'>
          <Dialog.Title className='DialogTitle'>创建</Dialog.Title>
          <Dialog.Description className='DialogDescription'>
            创建一个垂直聊天机器人、知识库
          </Dialog.Description>
          <fieldset className='Fieldset'>
            <label className='Label' htmlFor='libraryName'>
              名称
            </label>
            <input
              className='Input'
              id='libraryName'
              placeholder='知识库名称，全局不可重复'
              onChange={e => setLibraryName(e.target.value)}
              value={libraryName}
            />
          </fieldset>
          <fieldset className='Fieldset'>
            <label className='Label' htmlFor='description'>
              描述
            </label>
            <input
              className='Input'
              id='description'
              placeholder='知识库的描述'
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </fieldset>
          <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
            <Dialog.Close asChild>
              <button className='btn' onClick={handerCreate}>
                创建
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className='IconButton' aria-label='Close'>
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
