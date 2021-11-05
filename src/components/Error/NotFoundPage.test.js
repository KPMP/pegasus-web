import { getBackToHomePath } from './NotFoundPage';

describe('getBackToHomePath', () => {
    it('should return the path / when given a path of nothing', () => {
        const pathname = '/'
        const expectedPathname = '/'
        const resultedPathname = getBackToHomePath(pathname)
        
        expect(resultedPathname).toBe(expectedPathname)
    });
    it('should return the path / when not given a path with explorer', () => {
        const pathname = '/foo'
        const expectedPathname = '/'
        const resultedPathname = getBackToHomePath(pathname)
        
        expect(resultedPathname).toBe(expectedPathname)
    });
    it('should return the path / when given multiple subpath without explorer', () => {
        const pathname = '/foo/bar'
        const expectedPathname = '/'
        const resultedPathname = getBackToHomePath(pathname)
        
        expect(resultedPathname).toBe(expectedPathname)
    });
    it('should return the path /explorer when given a path with just explorer', () => {
        const pathname = '/explorer'
        const expectedPathname = '/explorer'
        const resultedPathname = getBackToHomePath(pathname)
        
        expect(resultedPathname).toBe(expectedPathname)
    });
    it('should return the path /explorer when given a path with explorer in it', () => {
        const pathname = '/explorer/foo'
        const expectedPathname = '/explorer'
        const resultedPathname = getBackToHomePath(pathname)
        
        expect(resultedPathname).toBe(expectedPathname)
    });
    it('should return the path / path when explorer not the first subpath', () => {
        const pathname = '/foo/explorer'
        const expectedPathname = '/'
        const resultedPathname = getBackToHomePath(pathname)
        
        expect(resultedPathname).toBe(expectedPathname)
    });
});

