

<div align=center>

# xiaohongshuCrawler
 小红书 📕 获取文章title、文章id、文章内容、话题标签，
 
![GitHub language count](https://img.shields.io/github/languages/count/mcxiaoxiao/xiaohongshuCrawler)
![GitHub contributors](https://img.shields.io/github/contributors/mcxiaoxiao/xiaohongshuCrawler)
![GitHub Repo stars](https://img.shields.io/github/stars/mcxiaoxiao/xiaohongshuCrawler)
</br>

![Static Badge](https://img.shields.io/badge/python-blue)
![Static Badge](https://img.shields.io/badge/js-blue)

:school: Student of [@HRBUST](https://hrbust.edu.cn)
:man_technologist: [@mcxiaoxiao](https://github.com/mcxiaoxiao)

## Introduction :raised_hands:




xiaohongshuCrawler 📕 简单的小红书爬虫
python+油猴脚本模拟操作实现


 ![demo](https://github.com/mcxiaoxiao/xiaohongshuCrawler/blob/main/demo1.gif)

  ![demo](https://github.com/mcxiaoxiao/xiaohongshuCrawler/blob/main/demo2.png)

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
