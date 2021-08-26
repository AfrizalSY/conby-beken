const Consultant = require('../models/consultant');

exports.findTop4Consultants = (req, res) => {
    // sort by rating
    Consultant.find({})
        .sort({ rating: -1 })
        .select({ rating: 1, photo: 1, name: 1, subSpecialist: 1, price: 1 })
        .limit(4)
        .then((consultants) => {
            res.status(200).json({
                status: 200,
                message: 'success!',
                data: consultants
            });
        }).catch((err) => console.log(err));
};

exports.findAllConsultants = (req, res) => {
    if (!req.query.name) {
        Consultant.find({})
            .select({ rating: 1, photo: 1, name: 1, subSpecialist: 1, price: 1 })
            .then((consultants) => {
                if (!req.query.rating) {
                    if (!req.query.priceMax) {
                        if (!req.query.priceMin) {
                            if (!req.query.sortPrice) {
                                res.status(200).json({
                                    status: 200,
                                    message: 'success!',
                                    data: consultants
                                });
                            } else {
                                // asc / desc
                                if (req.query.sortPrice == 'asc') {
                                    consultants.sort((a, b) => {
                                        return a.price - b.price;
                                    });
                                    res.status(200).json({
                                        status: 200,
                                        message: 'success!',
                                        data: consultants
                                    });
                                } else if (req.query.sortPrice == 'desc') {
                                    consultants.sort((a, b) => {
                                        return b.price - a.price;
                                    });
                                    res.status(200).json({
                                        status: 200,
                                        message: 'success!',
                                        data: consultants
                                    });
                                }
                            }
                        } else {
                            var consultantsFiltered = consultants.filter((value) => {
                                return value.price >= req.query.priceMin;
                            });
                            if (!req.query.sortPrice) {
                                res.status(200).json({
                                    status: 200,
                                    message: 'success!',
                                    data: consultantsFiltered
                                });
                            } else {
                                // asc / desc
                                if (req.query.sortPrice == 'asc') {
                                    consultantsFiltered.sort((a, b) => {
                                        return a.price - b.price;
                                    });
                                    res.status(200).json({
                                        status: 200,
                                        message: 'success!',
                                        data: consultantsFiltered
                                    });
                                } else if (req.query.sortPrice == 'desc') {
                                    consultantsFiltered.sort((a, b) => {
                                        return b.price - a.price;
                                    });
                                    res.status(200).json({
                                        status: 200,
                                        message: 'success!',
                                        data: consultantsFiltered
                                    });
                                }
                            }
                        }
                    } else {
                        var consultantsFiltered = consultants.filter((value) => {
                            return value.price <= req.query.priceMax;
                        });
                        if (!req.query.priceMin) {
                            if (!req.query.sortPrice) {
                                res.status(200).json({
                                    status: 200,
                                    message: 'success!',
                                    data: consultantsFiltered
                                });
                            } else {
                                // asc / desc
                                if (req.query.sortPrice == 'asc') {
                                    consultantsFiltered.sort((a, b) => {
                                        return a.price - b.price;
                                    });
                                    res.status(200).json({
                                        status: 200,
                                        message: 'success!',
                                        data: consultantsFiltered
                                    });
                                } else if (req.query.sortPrice == 'desc') {
                                    consultantsFiltered.sort((a, b) => {
                                        return b.price - a.price;
                                    });
                                    res.status(200).json({
                                        status: 200,
                                        message: 'success!',
                                        data: consultantsFiltered
                                    });
                                }
                            }
                        } else {
                            var consultantsFiltered2 = consultantsFiltered.filter((value) => {
                                return value.price >= req.query.priceMin;
                            });
                            if (!req.query.sortPrice) {
                                res.status(200).json({
                                    status: 200,
                                    message: 'success!',
                                    data: consultantsFiltered2
                                });
                            } else {
                                // asc / desc
                                if (req.query.sortPrice == 'asc') {
                                    consultantsFiltered2.sort((a, b) => {
                                        return a.price - b.price;
                                    });
                                    res.status(200).json({
                                        status: 200,
                                        message: 'success!',
                                        data: consultantsFiltered2
                                    });
                                } else if (req.query.sortPrice == 'desc') {
                                    consultantsFiltered2.sort((a, b) => {
                                        return b.price - a.price;
                                    });
                                    res.status(200).json({
                                        status: 200,
                                        message: 'success!',
                                        data: consultantsFiltered2
                                    });
                                }
                            }
                        }
                    }
                } else {
                    var consultantsFiltered = consultants.filter((value) => {
                        return (value.rating >= req.query.rating) && (value.rating < (req.query.rating + 1));
                    });
                    if (!req.query.priceMax) {
                        if (!req.query.priceMin) {
                            if (!req.query.sortPrice) {
                                res.status(200).json({
                                    status: 200,
                                    message: 'success!',
                                    data: consultantsFiltered
                                });
                            } else {
                                // asc / desc
                                if (req.query.sortPrice == 'asc') {
                                    consultantsFiltered.sort((a, b) => {
                                        return a.price - b.price;
                                    });
                                    res.status(200).json({
                                        status: 200,
                                        message: 'success!',
                                        data: consultantsFiltered
                                    });
                                } else if (req.query.sortPrice == 'desc') {
                                    consultantsFiltered.sort((a, b) => {
                                        return b.price - a.price;
                                    });
                                    res.status(200).json({
                                        status: 200,
                                        message: 'success!',
                                        data: consultantsFiltered
                                    });
                                }
                            }
                        } else {
                            var consultantsFiltered2 = consultantsFiltered.filter((value) => {
                                return value.price >= req.query.priceMin;
                            });
                            if (!req.query.sortPrice) {
                                res.status(200).json({
                                    status: 200,
                                    message: 'success!',
                                    data: consultantsFiltered2
                                });
                            } else {
                                // asc / desc
                                if (req.query.sortPrice == 'asc') {
                                    consultantsFiltered2.sort((a, b) => {
                                        return a.price - b.price;
                                    });
                                    res.status(200).json({
                                        status: 200,
                                        message: 'success!',
                                        data: consultantsFiltered2
                                    });
                                } else if (req.query.sortPrice == 'desc') {
                                    consultantsFiltered2.sort((a, b) => {
                                        return b.price - a.price;
                                    });
                                    res.status(200).json({
                                        status: 200,
                                        message: 'success!',
                                        data: consultantsFiltered2
                                    });
                                }
                            }
                        }
                    } else {
                        var consultantsFiltered2 = consultantsFiltered.filter((value) => {
                            return value.price <= req.query.priceMax;
                        });
                        if (!req.query.priceMin) {
                            if (!req.query.sortPrice) {
                                res.status(200).json({
                                    status: 200,
                                    message: 'success!',
                                    data: consultantsFiltered2
                                });
                            } else {
                                // asc / desc
                                if (req.query.sortPrice == 'asc') {
                                    consultantsFiltered2.sort((a, b) => {
                                        return a.price - b.price;
                                    });
                                    res.status(200).json({
                                        status: 200,
                                        message: 'success!',
                                        data: consultantsFiltered2
                                    });
                                } else if (req.query.sortPrice == 'desc') {
                                    consultantsFiltered2.sort((a, b) => {
                                        return b.price - a.price;
                                    });
                                    res.status(200).json({
                                        status: 200,
                                        message: 'success!',
                                        data: consultantsFiltered2
                                    });
                                }
                            }
                        } else {
                            var consultantsFiltered3 = consultantsFiltered2.filter((value) => {
                                return value.price >= req.query.priceMin;
                            });
                            if (!req.query.sortPrice) {
                                res.status(200).json({
                                    status: 200,
                                    message: 'success!',
                                    data: consultantsFiltered3
                                });
                            } else {
                                // asc / desc
                                if (req.query.sortPrice == 'asc') {
                                    consultantsFiltered3.sort((a, b) => {
                                        return a.price - b.price;
                                    });
                                    res.status(200).json({
                                        status: 200,
                                        message: 'success!',
                                        data: consultantsFiltered3
                                    });
                                } else if (req.query.sortPrice == 'desc') {
                                    consultantsFiltered3.sort((a, b) => {
                                        return b.price - a.price;
                                    });
                                    res.status(200).json({
                                        status: 200,
                                        message: 'success!',
                                        data: consultantsFiltered3
                                    });
                                }
                            }
                        }
                    }
                }
            }).catch((err) => console.log(err));
    } else {
        Consultant.find({ name: { $regex: req.query.name, $options: '$i' } })
            .select({ rating: 1, photo: 1, name: 1, subSpecialist: 1, price: 1 })
            .then((consultants) => {
                if (!req.query.rating) {
                    if (!req.query.priceMax) {
                        if (!req.query.priceMin) {
                            if (!req.query.sortPrice) {
                                res.status(200).json({
                                    status: 200,
                                    message: 'success!',
                                    data: consultants
                                });
                            } else {
                                // asc / desc
                                if (req.query.sortPrice == 'asc') {
                                    consultants.sort((a, b) => {
                                        return a.price - b.price;
                                    });
                                    res.status(200).json({
                                        status: 200,
                                        message: 'success!',
                                        data: consultants
                                    });
                                } else if (req.query.sortPrice == 'desc') {
                                    consultants.sort((a, b) => {
                                        return b.price - a.price;
                                    });
                                    res.status(200).json({
                                        status: 200,
                                        message: 'success!',
                                        data: consultants
                                    });
                                }
                            }
                        } else {
                            var consultantsFiltered = consultants.filter((value) => {
                                return value.price >= req.query.priceMin;
                            });
                            if (!req.query.sortPrice) {
                                res.status(200).json({
                                    status: 200,
                                    message: 'success!',
                                    data: consultantsFiltered
                                });
                            } else {
                                // asc / desc
                                if (req.query.sortPrice == 'asc') {
                                    consultantsFiltered.sort((a, b) => {
                                        return a.price - b.price;
                                    });
                                    res.status(200).json({
                                        status: 200,
                                        message: 'success!',
                                        data: consultantsFiltered
                                    });
                                } else if (req.query.sortPrice == 'desc') {
                                    consultantsFiltered.sort((a, b) => {
                                        return b.price - a.price;
                                    });
                                    res.status(200).json({
                                        status: 200,
                                        message: 'success!',
                                        data: consultantsFiltered
                                    });
                                }
                            }
                        }
                    } else {
                        var consultantsFiltered = consultants.filter((value) => {
                            return value.price <= req.query.priceMax;
                        });
                        if (!req.query.priceMin) {
                            if (!req.query.sortPrice) {
                                res.status(200).json({
                                    status: 200,
                                    message: 'success!',
                                    data: consultantsFiltered
                                });
                            } else {
                                // asc / desc
                                if (req.query.sortPrice == 'asc') {
                                    consultantsFiltered.sort((a, b) => {
                                        return a.price - b.price;
                                    });
                                    res.status(200).json({
                                        status: 200,
                                        message: 'success!',
                                        data: consultantsFiltered
                                    });
                                } else if (req.query.sortPrice == 'desc') {
                                    consultantsFiltered.sort((a, b) => {
                                        return b.price - a.price;
                                    });
                                    res.status(200).json({
                                        status: 200,
                                        message: 'success!',
                                        data: consultantsFiltered
                                    });
                                }
                            }
                        } else {
                            var consultantsFiltered2 = consultantsFiltered.filter((value) => {
                                return value.price >= req.query.priceMin;
                            });
                            if (!req.query.sortPrice) {
                                res.status(200).json({
                                    status: 200,
                                    message: 'success!',
                                    data: consultantsFiltered2
                                });
                            } else {
                                // asc / desc
                                if (req.query.sortPrice == 'asc') {
                                    consultantsFiltered2.sort((a, b) => {
                                        return a.price - b.price;
                                    });
                                    res.status(200).json({
                                        status: 200,
                                        message: 'success!',
                                        data: consultantsFiltered2
                                    });
                                } else if (req.query.sortPrice == 'desc') {
                                    consultantsFiltered2.sort((a, b) => {
                                        return b.price - a.price;
                                    });
                                    res.status(200).json({
                                        status: 200,
                                        message: 'success!',
                                        data: consultantsFiltered2
                                    });
                                }
                            }
                        }
                    }
                } else {
                    var consultantsFiltered = consultants.filter((value) => {
                        return (value.rating >= req.query.rating) && (value.rating < (req.query.rating + 1));
                    });
                    if (!req.query.priceMax) {
                        if (!req.query.priceMin) {
                            if (!req.query.sortPrice) {
                                res.status(200).json({
                                    status: 200,
                                    message: 'success!',
                                    data: consultantsFiltered
                                });
                            } else {
                                // asc / desc
                                if (req.query.sortPrice == 'asc') {
                                    consultantsFiltered.sort((a, b) => {
                                        return a.price - b.price;
                                    });
                                    res.status(200).json({
                                        status: 200,
                                        message: 'success!',
                                        data: consultantsFiltered
                                    });
                                } else if (req.query.sortPrice == 'desc') {
                                    consultantsFiltered.sort((a, b) => {
                                        return b.price - a.price;
                                    });
                                    res.status(200).json({
                                        status: 200,
                                        message: 'success!',
                                        data: consultantsFiltered
                                    });
                                }
                            }
                        } else {
                            var consultantsFiltered2 = consultantsFiltered.filter((value) => {
                                return value.price >= req.query.priceMin;
                            });
                            if (!req.query.sortPrice) {
                                res.status(200).json({
                                    status: 200,
                                    message: 'success!',
                                    data: consultantsFiltered2
                                });
                            } else {
                                // asc / desc
                                if (req.query.sortPrice == 'asc') {
                                    consultantsFiltered2.sort((a, b) => {
                                        return a.price - b.price;
                                    });
                                    res.status(200).json({
                                        status: 200,
                                        message: 'success!',
                                        data: consultantsFiltered2
                                    });
                                } else if (req.query.sortPrice == 'desc') {
                                    consultantsFiltered2.sort((a, b) => {
                                        return b.price - a.price;
                                    });
                                    res.status(200).json({
                                        status: 200,
                                        message: 'success!',
                                        data: consultantsFiltered2
                                    });
                                }
                            }
                        }
                    } else {
                        var consultantsFiltered2 = consultantsFiltered.filter((value) => {
                            return value.price <= req.query.priceMax;
                        });
                        if (!req.query.priceMin) {
                            if (!req.query.sortPrice) {
                                res.status(200).json({
                                    status: 200,
                                    message: 'success!',
                                    data: consultantsFiltered2
                                });
                            } else {
                                // asc / desc
                                if (req.query.sortPrice == 'asc') {
                                    consultantsFiltered2.sort((a, b) => {
                                        return a.price - b.price;
                                    });
                                    res.status(200).json({
                                        status: 200,
                                        message: 'success!',
                                        data: consultantsFiltered2
                                    });
                                } else if (req.query.sortPrice == 'desc') {
                                    consultantsFiltered2.sort((a, b) => {
                                        return b.price - a.price;
                                    });
                                    res.status(200).json({
                                        status: 200,
                                        message: 'success!',
                                        data: consultantsFiltered2
                                    });
                                }
                            }
                        } else {
                            var consultantsFiltered3 = consultantsFiltered2.filter((value) => {
                                return value.price >= req.query.priceMin;
                            });
                            if (!req.query.sortPrice) {
                                res.status(200).json({
                                    status: 200,
                                    message: 'success!',
                                    data: consultantsFiltered3
                                });
                            } else {
                                // asc / desc
                                if (req.query.sortPrice == 'asc') {
                                    consultantsFiltered3.sort((a, b) => {
                                        return a.price - b.price;
                                    });
                                    res.status(200).json({
                                        status: 200,
                                        message: 'success!',
                                        data: consultantsFiltered3
                                    });
                                } else if (req.query.sortPrice == 'desc') {
                                    consultantsFiltered3.sort((a, b) => {
                                        return b.price - a.price;
                                    });
                                    res.status(200).json({
                                        status: 200,
                                        message: 'success!',
                                        data: consultantsFiltered3
                                    });
                                }
                            }
                        }
                    }
                }
            }).catch((err) => console.log(err));
    }
};

exports.findOneConsultant = (req, res) => {
    Consultant.findOne({ _id: req.params.id })
        .select({ rating: 1, photo: 1, name: 1, subSpecialist: 1, price: 1, reviews: 1 })
        .populate('reviews.user', 'name photo')
        .then((consultant) => {
            res.status(200).json({
                status: 200,
                message: 'success!',
                data: consultant
            });
        }).catch((err) => console.log(err));
};