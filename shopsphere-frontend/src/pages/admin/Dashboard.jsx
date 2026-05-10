import React, { useEffect, useState } from 'react';
import { 
  Package, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  Plus, 
  Search, 
  Trash2,
  ArrowUpRight,
  ArrowDownRight,
  Loader2,
  Image as ImageIcon
} from 'lucide-react';
import api from '../../api/axios';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    stockQuantity: '',
    imageUrl: '',
    categoryId: 1
  });

  const [stats, setStats] = useState({
    totalSales: 45231.89,
    activeUsers: 2350,
    totalProducts: 0,
    totalOrders: 1205
  });

  const fetchData = async () => {
    try {
      const response = await api.get('/products');
      const productList = response.data.content || response.data;
      setProducts(productList);
      setStats(prev => ({ ...prev, totalProducts: productList.length }));
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/products', newProduct);
      setIsModalOpen(false);
      setNewProduct({
        name: '',
        description: '',
        price: '',
        stockQuantity: '',
        imageUrl: '',
        categoryId: 1
      });
      fetchData();
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Check if you have ADMIN permissions.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500">Manage your store inventory and track performance.</p>
          </div>
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Product
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
              <DollarSign className="w-4 h-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">${stats.totalSales.toLocaleString()}</div>
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1 font-medium">
                <ArrowUpRight size={12} />
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-gray-600">Active Users</CardTitle>
              <Users className="w-4 h-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">+{stats.activeUsers}</div>
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1 font-medium">
                <ArrowUpRight size={12} />
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-gray-600">Total Products</CardTitle>
              <Package className="w-4 h-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.totalProducts}</div>
              <p className="text-xs text-blue-600 flex items-center gap-1 mt-1 font-medium">
                <Plus size={12} />
                Live in catalog
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
              <ShoppingCart className="w-4 h-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">+{stats.totalOrders}</div>
              <p className="text-xs text-red-600 flex items-center gap-1 mt-1 font-medium">
                <ArrowDownRight size={12} />
                -4% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Product Table */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Inventory List</CardTitle>
                <CardDescription>View and manage your product catalog.</CardDescription>
              </div>
              <div className="relative w-64 hidden sm:block">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search products..." className="pl-8 h-9" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="animate-spin text-blue-600" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-100">
                            {product.imageUrl ? (
                              <img src={product.imageUrl} alt={product.name} className="object-cover w-full h-full" />
                            ) : (
                              <Package size={16} className="text-gray-400" />
                            )}
                          </div>
                          <span className="truncate">{product.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{product.categoryId || 'Electronics'}</TableCell>
                      <TableCell className="font-semibold text-gray-900">${product.price}</TableCell>
                      <TableCell>{product.stockQuantity || 0}</TableCell>
                      <TableCell>
                        <Badge variant={product.stockQuantity > 0 ? "secondary" : "destructive"} className="font-medium">
                          {product.stockQuantity > 0 ? "Active" : "Out of Stock"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 size={18} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Add Product Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <p className="text-sm text-gray-500">Fill in the details to list a new item in your store.</p>
          </DialogHeader>
          <form onSubmit={handleAddProduct} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input 
                id="name" 
                required 
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                placeholder="e.g. Wireless Headphones" 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input 
                  id="price" 
                  type="number" 
                  step="0.01" 
                  required 
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  placeholder="99.99" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input 
                  id="stock" 
                  type="number" 
                  required 
                  value={newProduct.stockQuantity}
                  onChange={(e) => setNewProduct({...newProduct, stockQuantity: e.target.value})}
                  placeholder="50" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <div className="relative">
                <ImageIcon className="absolute left-2.5 top-2.5 text-gray-400 w-4 h-4" />
                <Input 
                  id="image" 
                  className="pl-9"
                  value={newProduct.imageUrl}
                  onChange={(e) => setNewProduct({...newProduct, imageUrl: e.target.value})}
                  placeholder="https://images.unsplash.com/..." 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="desc">Description</Label>
              <Textarea 
                id="desc" 
                required 
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                placeholder="Briefly describe the product features..." 
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700" disabled={submitting}>
                {submitting ? <Loader2 className="animate-spin mr-2" size={18} /> : 'Save Product'}
              </Button>
            </div>
          </form>
        </Dialog>
      </div>
    </div>
  );
};

export default Dashboard;
