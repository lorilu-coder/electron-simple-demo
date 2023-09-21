// 下列 ifdef 块是创建使从 DLL 导出更简单的
// 宏的标准方法。此 DLL 中的所有文件都是用命令行上定义的 MYDLLDEMO_EXPORTS
// 符号编译的。在使用此 DLL 的
// 任何项目上不应定义此符号。这样，源文件中包含此文件的任何其他项目都会将
// MYDLLDEMO_API 函数视为是从 DLL 导入的，而此 DLL 则将用此宏定义的
// 符号视为是被导出的。
#ifdef MYDLLDEMO_EXPORTS
#define MYDLLDEMO_API __declspec(dllexport)
#else
#define MYDLLDEMO_API __declspec(dllimport)
#endif

//‘extern "C"’意味着：被extern "C"修饰的变量和函数是按照C语言方式编译和链接的
extern "C"
{
	//参数和返回值都是基本数据类型
	MYDLLDEMO_API int add(int a, int b);

	//使用指针修改函数外部数据作为返回值
	MYDLLDEMO_API void addPtr(int a, int b, int* z);

	//外部传入数组的首地址，函数负责初始化数组数据
	//array为数组首地址，length为数组长度
	MYDLLDEMO_API void initArray(int* array, int length);
}
