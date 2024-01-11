const mongoose = require("mongoose");
const order = require("../model/order");


exports.createOrder = async (req, res) => {
    try {
        const { cartId, address } = req.body;
        if (!cartId) {
            return res.status(400).json({
                succuss: false,
                error: 'Cart not found!'
            });
        }
        let orderData = new order({
            cartId,
            address,
        });
        let result = await orderData.save()
        res.status(200).json({
            succuss: true,
            message: "Order created successfully",
            data: result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            succuss: false,
            message: "server error"
        })
    }
}

exports.populateOrder = async (req, res) => {
    try {
        let { _id } = req.body
        const data = await order.findOne({ _id }).populate("cartId");
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Cart populate succussfully",
            Data: data
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            succuss: false,
            message: "server error"
        })
    }
};


exports.completeOrder = async (req, res) => {
    try {
        const orderId = req.body.orderId; // Assuming orderId is part of the route parameters
        const updatedOrder = await order.findByIdAndUpdate(
            orderId,
            { $set: { status: 'completed' } },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Order marked as completed',
            data: updatedOrder
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

exports.markOrderAsPending = async (req, res) => {
    try {
        const orderId = req.body.orderId;
        const updatedOrder = await order.findByIdAndUpdate(
            orderId,
            { $set: { status: 'pending' } },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Order marked as pending',
            data: updatedOrder
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

exports.cancelOrder = async (req, res) => {
    try {
        const orderId = req.body.orderId;

        const orderData = await order.findById(orderId);

        if (!orderData) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        if (orderData.status === 'canceled' || orderData.status === 'completed') {
            return res.status(400).json({
                success: false,
                message: 'Cannot cancel the order. It is already canceled or completed.'
            });
        }

        orderData.status = 'canceled';
        const canceledOrder = await orderData.save();

        res.status(200).json({
            success: true,
            message: 'Order canceled successfully',
            data: canceledOrder
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

exports.updateOrder = async (req, res) => {
    try {
        const orderId = req.body.orderId;
        const { action } = req.body;

        // Check if the order exists
        const orderData = await order.findById(orderId);

        if (!orderData) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        if (!['complete', 'pending', 'cancel'].includes(action)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid action. Supported actions are: complete, pending, cancel'
            });
        }
        
        switch (action) {
            case 'complete':
                orderData.status = 'completed';
                break;
            case 'pending':
                orderData.status = 'pending';
                break;
            case 'cancel':
                orderData.status = 'canceled';
                break;
        }

        const updatedOrder = await orderData.save();

        res.status(200).json({
            success: true,
            message: `Order ${action}ed successfully`,
            data: updatedOrder
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

