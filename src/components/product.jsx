import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Modal, ModalHeader, ModalBody, ModalFooter, ModalContent, useDisclosure } from "@nextui-org/react";
import { Card, CardHeader, CardFooter, Image } from "@nextui-org/react";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Divider } from "@nextui-org/react";
const PexelsApiKey = '9MLdBX8TJ0zff1mKgZqnsf4RNDqfQT5ZJwcBNbXZVqQ0fQ9ac0JEDZTW';

function Product() {
    const valuesObject = {
        1: "All",
        2: 'Motivational',
        3: 'Mobile',
        4: 'Workout',
        5: 'Dark',
        6: 'Beautiful',
        7: 'Nature'
    };

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [category, setCategory] = useState('All');
    const [sort, setSort] = useState('Filter');
    const [likeCounts, setLikeCounts] = useState({});
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 640);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 640);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency array means this effect runs once on mount

    useEffect(() => {
        const fetchPhotos = async () => {
            let url;
            if (sort != null) {
                url = `https://api.pexels.com/v1/curated?per_page=100`;
            }
            if (category === 'all') {
                url = `https://api.pexels.com/v1/curated?per_page=10`;
            } else {
                url = `https://api.pexels.com/v1/search?query=${category}&per_page=10`;
            }
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: PexelsApiKey,
                    },
                });
                console.log(response.data)
                let sortedPhotos;
                if (sort === 'Popular') {
                    url = `https://api.pexels.com/v1/curated?per_page=100`;
                } else if (sort === 'New') {
                    sortedPhotos = response.data.photos
                        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                } else if (sort === 'NetWorthy') {
                    // Implement NetWorthy sorting logic if needed
                } else {
                    sortedPhotos = response.data.photos.sort(() => Math.random() - 0.5);
                }

                setPhotos(sortedPhotos.slice(0, 10));
                setLoading(false);
            } catch (err) {
                setError('Error fetching photos');
                setLoading(false);
            }
        };
        fetchPhotos();
    }, [category, sort]);

    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
    };

    const handleFilterChange = (newFilter) => {
        setSort(newFilter);
    };

    const handleLike = (photoId) => {
        setLikeCounts((prevLikeCounts) => {
            const newLikeCounts = {
                ...prevLikeCounts,
                [photoId]: (prevLikeCounts[photoId] || 0) + 1,
            };
            return newLikeCounts;
        });
    };

    const handlePhotoClick = (photo) => {
        setSelectedPhoto(photo);
        onOpen(); // Open the modal when a photo is clicked
    };

    return (
        <div>
            <div className='flex flex-col gap-3 lg:ml-24 sm:mt-10 lg:ml-60'>
                {/* <h1 className="text-3xl lg:ml-2">Category</h1> */}
                <div className="flex flex-wrap gap-4">
                    {isSmallScreen ? (
                        <Dropdown placement="bottom-start" className="">
                            <DropdownTrigger >
                                <Button className="w-full mt-10  py-2 px-2 transition-opacity hover:bg-indigo-700 overflow-hidden whitespace-nowrap rounded-lg">
                                    {category}<span className="material-symbols-outlined">keyboard_arrow_down</span>
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                {Object.entries(valuesObject).map(([key, value]) => (
                                    <DropdownItem key={key} onClick={() => handleCategoryChange(value)}>{value}</DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    ) : (
                        Object.entries(valuesObject).map(([key, value]) => (
                            <div key={key} className="flex-shrink-0">
                                <button onClick={() => handleCategoryChange(value)} className="w-full sm:w-28 py-2 px-2 transition-opacity hover:bg-indigo-700 overflow-hidden whitespace-nowrap rounded-lg">
                                    {value}
                                </button>
                            </div>
                        ))
                    )}
                    <Dropdown placement="bottom-start">
                        <DropdownTrigger>
                            <Button className="w-full mb-10 sm:w-28 py-2 px-2 transition-opacity hover:bg-indigo-700 overflow-hidden whitespace-nowrap rounded-lg">
                                {sort}<span className="material-symbols-outlined">filter_list</span>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                            <DropdownItem onClick={() => handleFilterChange('New')}>New</DropdownItem>
                            <DropdownItem onClick={() => handleFilterChange('Networthy')}>Networthy</DropdownItem>
                            <DropdownItem onClick={() => handleFilterChange('Random')}>Random</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            <div className="flex justify-center">
                <h1 className="text-3xl text-center ">Photos</h1>
            </div>
            {photos.length === 0 ? (
                <div className="flex items-center justify-center h-screen">
                    <h1 className="text-center lg:text-5xl font-bold lg:ml-18 sm:text-lg">
                        Oops! 🤭 Sorry
                        No photos match.
                    </h1>
                </div>
            ) : (
                <div className="max-w-100 grid grid-cols-3 grid-rows-2 gap-10   lg:p-20  " id="photos">
                    {photos.map((photo) => (
                        <div key={photo.id} className="col-span-4 sm:col-span-2 md:col-span-1">
                            <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7">
                                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                                    <p className="text-tiny text-white/60 uppercase font-bold">{photo.alt}</p>
                                    <h4 className="text-white/90 font-medium text-xl"></h4>
                                </CardHeader>
                                <Image
                                    onClick={() => handlePhotoClick(photo)}
                                    removeWrapper
                                    alt="Relaxing app background"
                                    className="z-0 w-full h-full object-cover"
                                    src={photo.src.large}
                                />
                                <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                                    <div className="flex flex-grow gap-2 items-center">
                                        <div className="flex flex-col">
                                            <p className="text-tiny text-white/60">{photo.photographer}</p>
                                        </div>
                                    </div>
                                    <Button
                                        className={`text-tiny text-white ${likeCounts[photo.id] ? 'text-red-500' : 'text-white-800'
                                            } bg-black/20`}
                                        onClick={() => handleLike(photo.id)}
                                        variant="flat"
                                        color="default"
                                        radius="lg"
                                        size="sm"
                                    >
                                        <span className="material-symbols-outlined">
                                            {likeCounts[photo.id] ? 'favorite' : 'favorite_border'}
                                        </span>
                                        <p className="font-bold ">{likeCounts[photo.id] || 0}</p>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    ))}
                    <Modal
                        size={'4xl'}
                        isOpen={isOpen}
                        onClose={onClose}
                    >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className=" text-tiny flex flex-col text-indigo-500">Art By:<br /> <span className="text-black">{selectedPhoto.photographer}</span> </ModalHeader>
                                    <ModalBody className="">
                                        {selectedPhoto && (
                                            <Image
                                                removeWrapper
                                                alt="Selected photo"
                                                className="w-full  object-cover"
                                                src={selectedPhoto.src.landscape}
                                            />
                                        )}
                                    </ModalBody>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </div>
                
            )}
             <div className="flex justify-center">
                <Divider className="w-48 h-1 rounded-lg" />
            </div>
        </div>
    );
}

export default Product;
