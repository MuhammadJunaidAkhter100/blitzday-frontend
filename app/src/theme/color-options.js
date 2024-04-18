// Colors

const neutral = {
    50: '#F3F4F6',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827'
};

const background = {
    default: '#000000',
    paper: '#0D0D1A',
    light: '#1E2330'
};

const divider = '#181A1F';

const primary = {
    main: '#5D22FE',
    light: '5D22FE',
    dark: '#280A78',
    contrastText: '#FFFFFF',
};

const secondary = {
    main: '#FFCF52',
    light: '#FFD977',
    dark: '#ECBC41',
    contrastText: '#1F2128'
};

const success = {
    main: '#14B8A6',
    light: '#43C6B7',
    dark: '#0E8074',
    contrastText: neutral[900]
};

const info = {
    main: '#2196F3',
    light: '#64B6F7',
    dark: '#0B79D0',
    contrastText: neutral[900]
};

const warning = {
    main: '#FFCF52',
    light: '#FFBF4C',
    dark: '#B27B16',
    contrastText: neutral[900]
};

const error = {
    main: '#E42020',
    light: '#E4202033',
    dark: '#922E2E',
    contrastText: neutral[900]
};

const text = {
    primary: '#DAFDFF',
    secondary: '#899EA2',
    disabled: '#323838'
};

export const colorOptions = {
    components: {
        MuiAvatar: {
            styleOverrides: {
                root: {
                    backgroundColor: primary.main,
                    color: text.primary
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    '&.MuiChip-filledDefault': {
                        backgroundColor: neutral[800],
                        '& .MuiChip-deleteIcon': {
                            color: neutral[500]
                        }
                    },
                    '&.MuiChip-outlinedDefault': {
                        borderColor: neutral[700],
                        '& .MuiChip-deleteIcon': {
                            color: neutral[700]
                        }
                    }
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                outlined: {
                    borderColor: text.primary,
                    color: text.primary,
                    '&:hover': {
                        borderColor: text.primary,
                        backgroundColor: background.paper
                    },
                },
                outlinedError: {
                    borderColor: error.main,
                    color: error.main,
                    '&:hover': {
                        borderColor: error.dark,
                        backgroundColor: background.paper
                    }
                },
            }
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    '&::placeholder': {
                        opacity: 1,
                        color: text.secondary
                    }
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    borderColor: divider
                }
            }
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    borderColor: background.paper,
                    borderStyle: 'solid',
                    borderWidth: 1
                }
            }
        },
        MuiPopover: {
            styleOverrides: {
                paper: {
                    borderColor: background.paper,
                    borderStyle: 'solid',
                    borderWidth: 1
                }
            }
        },
        MuiSwitch: {
            styleOverrides: {
                switchBase: {
                    color: neutral[700]
                },
                track: {
                    backgroundColor: neutral[500],
                    opacity: 1
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: `1px solid ${divider}`
                }
            }
        },
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    '& .MuiDataGrid-row': {
                        cursor: 'pointer',
                        borderTop: `1px solid ${divider}`
                    },
                    //last row
                    '& .MuiDataGrid-row:last-child': {
                        borderBottom: `1px solid ${divider}`
                    }
                }
            }
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: neutral[800],
                    '.MuiTableCell-root': {
                        color: neutral[300]
                    }
                }
            }
        }
    },
    palette: {
        action: {
            active: '#fff',
            hover: 'rgba(255, 255, 255, 0.04)',
            selected: 'rgba(255, 255, 255, 0.08)',
            disabledBackground: 'rgba(255, 255, 255, 0.12)',
            disabled: 'rgba(255, 255, 255, 0.26)'
        },
        background,
        divider,
        error,
        info,
        mode: 'dark',
        neutral,
        primary,
        secondary,
        success,
        text,
        warning
    },
    shadows: [
        'none',
        '0px 1px 2px rgba(0, 0, 0, 0.24)',
        '0px 1px 2px rgba(0, 0, 0, 0.24)',
        '0px 1px 4px rgba(0, 0, 0, 0.24)',
        '0px 1px 5px rgba(0, 0, 0, 0.24)',
        '0px 1px 6px rgba(0, 0, 0, 0.24)',
        '0px 2px 6px rgba(0, 0, 0, 0.24)',
        '0px 3px 6px rgba(0, 0, 0, 0.24)',
        '0px 4px 6px rgba(0, 0, 0, 0.24)',
        '0px 5px 12px rgba(0, 0, 0, 0.24)',
        '0px 5px 14px rgba(0, 0, 0, 0.24)',
        '0px 5px 15px rgba(0, 0, 0, 0.24)',
        '0px 6px 15px rgba(0, 0, 0, 0.24)',
        '0px 7px 15px rgba(0, 0, 0, 0.24)',
        '0px 8px 15px rgba(0, 0, 0, 0.24)',
        '0px 9px 15px rgba(0, 0, 0, 0.24)',
        '0px 10px 15px rgba(0, 0, 0, 0.24)',
        '0px 12px 22px -8px rgba(0, 0, 0, 0.24)',
        '0px 13px 22px -8px rgba(0, 0, 0, 0.24)',
        '0px 14px 24px -8px rgba(0, 0, 0, 0.24)',
        '0px 20px 25px rgba(0, 0, 0, 0.24)',
        '0px 25px 50px rgba(0, 0, 0, 0.24)',
        '0px 25px 50px rgba(0, 0, 0, 0.24)',
        '0px 25px 50px rgba(0, 0, 0, 0.24)',
        '0px 25px 50px rgba(0, 0, 0, 0.24)'
    ]
};
