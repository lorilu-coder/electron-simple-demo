// MyDllDemo.cpp : 定义 DLL 的导出函数。
//

#include "pch.h"
#include "framework.h"
#include "MyDllDemo.h"

MYDLLDEMO_API int add(int a, int b)
{
	return a + b;
}

//使用指针修改函数外部数据作为返回值
MYDLLDEMO_API void addPtr(int a, int b, int* z)
{
	*z = a + b;
}

//外部传入数组的首地址，函数负责初始化数组数据
MYDLLDEMO_API void initArray(int* array, int length)
{
	for (int i = 0; i < length; i++, array++)
	{
		*array = 100 + i;	//假设数组长度为 4，则程序运行完毕后结果为[100,101,102,103]
	}
}