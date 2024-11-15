"use client";
import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'
import { components } from './TLComponents';

export const Draw = () => {
    return (
		<div className='h-full w-full'>
			<Tldraw options={{ maxPages: 1 }} components={components} />
		</div>
	)
};