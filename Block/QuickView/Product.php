<?php
namespace Fr3on\QuickView\Block\QuickView;

use Magento\Framework\View\Element\Template;
use Magento\Catalog\Model\Product as ProductModel;

class Product extends Template
{
    protected $product;

    public function setProduct(ProductModel $product)
    {
        $this->product = $product;
        return $this;
    }

    public function getProduct()
    {
        return $this->product;
    }
}
