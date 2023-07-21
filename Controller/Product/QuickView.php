<?php
namespace Fr3on\QuickView\Controller\Product;

use Magento\Framework\App\Action\Action;
use Magento\Framework\App\Action\Context;
use Magento\Catalog\Model\ProductFactory;
use Magento\Framework\Controller\Result\JsonFactory;

class QuickView extends Action
{
    protected $productFactory;
    protected $resultJsonFactory;

    public function __construct(
        Context $context,
        ProductFactory $productFactory,
        JsonFactory $resultJsonFactory
    ) {
        parent::__construct($context);
        $this->productFactory = $productFactory;
        $this->resultJsonFactory = $resultJsonFactory;
    }

    public function execute()
    {
        $productId = $this->getRequest()->getParam('product_id');
        $product = $this->productFactory->create()->load($productId);

        $responseData = [
            'product_name' => $product->getName(),
            'product_description' => $product->getDescription(),
        ];

        if ($product) {
            $responseData = [
                'product_name' => $product->getName(),
                'product_description' => strip_tags($product->getDescription()),
            ];
        } else {
            $responseData = [
                'error' => 'Product not found.',
            ];
        }

        $resultJson = $this->resultJsonFactory->create();
        return $resultJson->setData($responseData);
    }
}
