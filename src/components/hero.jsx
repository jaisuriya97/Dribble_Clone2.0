import React from 'react';
import { Divider } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
function Hero() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
;
    return (
        <div id="hero" className="overflow-hidden">

            <Divider className="my-4" />
            <div className="grid grid-flow-col grid-rows-2 sm:grid-rows-1 sm:grid-cols-2 gap-4 lg:ml-10">

                <div className="flex items-center justify-center">
                    <main className="max-w-screen-xl px-4 lg:px-16">
                        <div className="text-left">
                            <h3 className="text-4xl tracking-tight leading-10 font-extrabold text-indigo-100 sm:text-5xl sm:leading-none md:text-6xl">
                                Discover world's top
                                <br />
                                <span className="text-indigo-600">designers & creatives</span>
                            </h3>
                            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                Dribbble is the leading destination to find & showcase creative work and home to
                                the world's best design
                            </p>
                            <div className="mt-5 sm:mt-8 sm:flex justify-start">
                                <div className="mt-3 sm:mt-0 sm:ml-3 cursor-pointer" onClick={onOpen}>
                                    <a onClick={onOpen} className="w-full flex items-center cursor-pointer justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-300 transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
                                        Explore
                                    </a>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
                <div className="w-full object-cover lg:w-full md:h-screen bg-cover bg-center lg:ml-48">
                    <img src="https://i.pinimg.com/564x/75/a3/8a/75a38a7560b07c1d935deb5de584fbb8.jpg" width={420} alt="" />
                </div>

            </div>
            <div className="flex justify-center">
                <Divider className="w-48 h-1 rounded-lg" />
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='bg-white'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody className='text-black'>
                                <div className="flex justify-center">
                                    <h1 className="text-sm mt-5 text-center ">Revel in refinement 🌟<br /><span className='font-bold '>Discover more by scrolling down for an enhanced experience!</span></h1>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}

export default Hero;
