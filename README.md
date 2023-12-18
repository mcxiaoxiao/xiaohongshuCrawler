

<div align=center>

# xiaohongshuCrawler
 小红书📕 获取文章title、文章id、文章内容、话题标签，
 
![GitHub language count](https://img.shields.io/github/languages/count/mcxiaoxiao/c-Decision-tree)
![GitHub contributors](https://img.shields.io/github/contributors/mcxiaoxiao/c-Decision-tree)
![GitHub Repo stars](https://img.shields.io/github/stars/mcxiaoxiao/c-Decision-tree)
</br>

![Static Badge](https://img.shields.io/badge/c++-blue)

:school: Student of [@HRBUST](https://hrbust.edu.cn)
:man_technologist: [@mcxiaoxiao](https://github.com/mcxiaoxiao)

## Introduction :raised_hands:




c-Decision-tree 🌳 简单的决策树
比较严谨的c++实现，如果输出有报错可能是不支持emoji
代码以天气预测是否适合出行为例，修改起来很方便。


 ![demo](https://github.com/mcxiaoxiao/c-Decision-tree/blob/master/demo.png)

</div>
 
 
# 三步实现

0️⃣ 🤔 想好想要多少个特征，line13：
```c++
#define feature 4 //改成需要的特征数量
```

1️⃣ 🤔 想好特征名，line18
```c++
//四个特征的名称，比如天气取值有三个：晴，阴，雨 
string attribute[] = {"天气", "温度", "湿度", "是否有风"};
```

3️⃣ 🖊 修改data.txt中的案例数据，修改测试数据line255
```c++
string test[] = {"晴", "温", "中", "是"};
```

 
# 交互（可选）
去掉以下注释，修改成自己修改后逻辑下的交互提示，line256
```c++
int main() {	
	createDataset();
	root = createTree(root, X, attributes);
	print(root, 0);
	string test[] = {"晴", "温", "中", "是"};
    // //自助交互
    // cout << "👋  请输入天气情况 ☁️ （晴/阴/雨）";
    // cin >> test[0];
    // cout << "😴  请输入温度 🌡️ （热/温/凉爽）";
    // cin >> test[1];
    // cout << "🌁  请输入湿度 💦 （高/中）";
    // cin >> test[2];
    // cout << "🚗  请输入是否刮风 🌬 （是/否）";
    // cin >> test[3];
	int i;
	cout << endl << "属性：";
	for(i=0; i<feature; i++)
		cout << attributes[i] << "\t";
	cout << endl << "输入：";
	for(i=0; i<feature; i++)
		cout << test[i] << "\t";
	cout << endl << "预测：";
	cout << classify(root, attributes, test) +"出行" << endl;
	freeNode(root);
	return 0;
}
```
