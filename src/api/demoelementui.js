import request from '@/utils/request'

// 查询DemoElementui列表
export function listDemoElementui(query) {
return request({
url: '/api/v1/demoelementuiList',
method: 'get',
params: query
})
}

// 查询DemoElementui详细
export function getDemoElementui (id) {
return request({
url: '/api/v1/demoelementui/' + id,
method: 'get'
})
}


// 新增DemoElementui
export function addDemoElementui(data) {
return request({
url: '/api/v1/demoelementui',
method: 'post',
data: data
})
}

// 修改DemoElementui
export function updateDemoElementui(data) {
return request({
url: '/api/v1/demoelementui',
method: 'put',
data: data
})
}

// 删除DemoElementui
export function delDemoElementui(id) {
return request({
url: '/api/v1/demoelementui/' + id,
method: 'delete'
})
}

