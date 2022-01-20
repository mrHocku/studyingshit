/******************************************************************************************
По входной последовательности целых чисел построить
бинарное дерево. Найти номер уровня, на котором
сумма вершин максимальна.
Дата: 21.10.2020
*******************************************************************************************/
// 8 4 12 2 5 9 14 3 7 10 0 example
#include <iostream>
#include <iomanip>
using namespace std;

struct TreeNode
{
	int info;
	TreeNode* left, * right;
};

/*-------------------------------------------------------
  Вставка в дерево с корнем root новой вершины с ключом k
  В случае совпадения ключа операция отклюняется
-------------------------------------------------------*/
void insertNode(TreeNode*& root, int k)
{
	if (root == nullptr)
	{
		root = new TreeNode;
		root->info = k;
		root->left = nullptr;
		root->right = nullptr;
	}
	else
	{
		if (k < root->info)
			insertNode(root->left, k);
		else
			if (k > root->info)
				insertNode(root->right, k);
			else
				cout << "Duplicate number!" << endl;
	}
	return;
}

/*------------------------------------------------------------
  Формирование БДП с корнем root по входной последовательности
  целых чисел
------------------------------------------------------------*/
void makeTree(TreeNode*& root)
{
	int k;
	cout << "Input numbers for 0" << endl;
	cin >> k;
	while (k)
	{
		insertNode(root, k);
		cin >> k;
	}
	return;
}

/*---------------------------------
  Вывод бинарного дерева на консоль
---------------------------------*/
void printTree(TreeNode*& root, const int level)
{
	if (root)
	{
		printTree(root->left, level + 1);
		cout << std::setw(level * 4) << root->info << endl;
		printTree(root->right, level + 1);
	}
	return;
}

/*---------------------------------------------------------------------------
  Поиск в БДП с корнем root вершины с ключом k
  Функция возвращает адрес найденной вершины либо nullptr при неуспехе поиска
---------------------------------------------------------------------------*/
TreeNode* searchTree(TreeNode* root, int value)
{
	if (root)
	{
		if (value == root->info)
			return root;
		else
			if (value < root->info)
				return searchTree(root->left, value);
			else
				return searchTree(root->right, value);
	}
	else
		return nullptr;
}

/*-----------------------------------------------
  Вспомогательная функция удаления вершины из БДП
-----------------------------------------------*/
void  del(TreeNode*& r, TreeNode*& delnode)
{
	if (r->right)
		del(r->right, delnode);
	else
	{
		delnode->info = r->info;
		delnode = r;
		r = r->left;
	}
	return;
}

/*----------------------------------------------------
  Функция удаляет из БДП с корнем p вершину с ключом k
  если такая вершина имеется
----------------------------------------------------*/
void DeleteNode(TreeNode*& p, int k)
{
	TreeNode* delnode;

	if (p == nullptr)
		return;
	else
	{
		if (k < p->info)
			DeleteNode(p->left, k);
		else
			if (k > p->info)
				DeleteNode(p->right, k);
			else
			{
				delnode = p;
				if (delnode->right == nullptr)
					p = delnode->left;
				else
					if (delnode->left == nullptr)
						p = delnode->right;
					else
						del(delnode->left, delnode);

				delete delnode;
			}

	}
	return;
}

/*------------------------------------------------
  Функция возвращает сумму вершин бинарного дерева
------------------------------------------------*/
int sumLevel(TreeNode* root, int level, const int current_level, const int position)
{
	if (root)
	{
		//cout << level << ' ' << current_level << ' ' << position << ' ' << root->info << endl;

		if (level == current_level)
			return root->info;
		else
			return sumLevel(root->left, level, current_level + 1, position * 2 - 1)
			+ sumLevel(root->right, level, current_level + 1, position * 2);
	}
	else
		return 0;
}

int MaxLevel(TreeNode*& root, const int level)
{
	if (root)
	{
		int level_l = MaxLevel(root->left, level + 1);
		int level_r = MaxLevel(root->right, level + 1);
		if (level_l < level_r)
			return level_r;
		return level_l;
	}
	else
		return level - 1;
}

int main()
{
	TreeNode* root = nullptr;
	makeTree(root);
	cout << "Tree:" << endl;
	printTree(root, 0);

	int max = -2147483647;
	int level = 1;
	for (int i = 1; i <= MaxLevel(root, 0); i++)
	{
		if (sumLevel(root, i, 1, 1) > max)
		{
			max = sumLevel(root, i, 1, 1);
			level = i;
		}
		cout << i << ' ' << sumLevel(root, i, 1, 1) << endl;
	}
	cout << "Max_level: " << level << endl;

	system("pause");
	return 0;
}