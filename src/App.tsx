import './App.css'
import useSWR from 'swr'
import { fetcherWithKey } from './fetcher'
import { AddLibrary } from './components/AddLibrary/AddLibrary'

function App() {
  const { data, error, isLoading, mutate } = useSWR(
    ['https://aiproxy.io/api/library/list', ''],
    fetcherWithKey
  )

  // const handlerDelete = async (id: string) => {
  //   await fetch(`https://aiproxy.io/api/library/delete`, {
  //     method: 'DELETE'
  //   })
  //   mutate()
  // }

  return (
    <div className='App'>
      {isLoading && <span className='loading loading-spinner loading-lg'></span>}
      {data && !error && !isLoading && (
        <div>
          {data.data.records.map((record: any) => {
            return (
              <div key={record.id} className='card bg-base-100 shadow-xl mb-4'>
                <div className='card-body'>
                  <div className='card-title text-2xl font-bold'>{record.libraryName}</div>
                  <div className='text-xs flex gap-10'>
                    <div>更新时间：{record.gmtModified}</div>
                    <div>创建时间：{record.gmtCreate}</div>
                  </div>
                  <div className='text-base'>
                    <p>{record.description}</p>
                  </div>
                  <div className='card-actions justify-end'>
                    {/* <div
                      className='btn btn-secondary'
                      onClick={() => {
                        handlerDelete(record.id)
                      }}
                    >
                      删除
                    </div> */}
                    <div className='btn btn '>添加文档</div>
                  </div>
                </div>
              </div>
            )
          })}
          {/* 添加 */}
          <div className='mb-4'>
            <AddLibrary />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
