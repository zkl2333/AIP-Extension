// A generic onclick callback function.
const genericOnClick: (info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab | undefined) => void = (
  info,
  tab
) => {
  console.log('Standard context menu item clicked.', info, tab)
}

chrome.contextMenus.onClicked.addListener(genericOnClick)

chrome.runtime.onInstalled.addListener(function () {
  chrome.action.onClicked.addListener(tab => {
    // 跳转到选项页
    chrome.tabs.create({ url: 'options.html' })
  })
  // 右键菜单
  // 页面
  chrome.contextMenus.create({
    id: 'page',
    title: '将本页正文添加到知识库',
    contexts: ['page']
  })
  // 选中文字
  chrome.contextMenus.create({
    id: 'selection',
    title: '将选中文字添加到知识库',
    contexts: ['selection']
  })
  // 链接
  chrome.contextMenus.create({
    id: 'link',
    title: '将此链接内容添加到知识库',
    contexts: ['link']
  })
})
